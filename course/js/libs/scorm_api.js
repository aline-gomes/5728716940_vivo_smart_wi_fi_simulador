/*global console*/

/* ===========================================================

lms SCORM Wrapper for JavaScript
v1.1.20160322

Created by Philip Hutchison, January 2008-2016
https://github.com/lms/scorm-api-wrapper

Copyright (c) Philip Hutchison
MIT-style license: http://lms.mit-license.org/

This wrapper works with both SCORM 1.2 and SCORM 2004.

Inspired by APIWrapper.js, created by the ADL and
Concurrent Technologies Corporation, distributed by
the ADL (http://www.adlnet.gov/scorm).

SCORM.API.find() and SCORM.API.get() functions based
on ADL code, modified by Mike Rustici
(http://www.scorm.com/resources/apifinder/SCORMAPIFinder.htm),
further modified by Philip Hutchison

=============================================================== */


var lms = {};                                  //lms 'namespace' helps ensure no conflicts with possible other "SCORM" variables
lms.UTILS = {};                                //For holding UTILS functions
lms.debug = { isActive: true };                //Enable (true) or disable (false) for debug mode

lms.SCORM = {                                  //Define the SCORM object
    version:    null,                               //Store SCORM version.
    handleCompletionStatus: true,                   //Whether or not the wrapper should automatically handle the initial completion status
    handleExitMode: true,                           //Whether or not the wrapper should automatically handle the exit mode
    API:        { handle: null,
                  isFound: false },                 //Create API child object
    connection: { isActive: false },                //Create connection child object
    data:       { completionStatus: null,
                  exitStatus: null },               //Create data child object
    debug:      {}                                  //Create debug child object
};



/* --------------------------------------------------------------------------------
   lms.SCORM.isAvailable
   A simple function to allow Flash ExternalInterface to confirm
   presence of JS wrapper before attempting any LMS communication.

   Parameters: none
   Returns:    Boolean (true)
----------------------------------------------------------------------------------- */

lms.SCORM.isAvailable = function(){
    return true;
};



// ------------------------------------------------------------------------- //
// --- SCORM.API functions ------------------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   lms.SCORM.API.find(window)
   Looks for an object named API in parent and opener windows

   Parameters: window (the browser window object).
   Returns:    Object if API is found, null if no API found
---------------------------------------------------------------------------- */

lms.SCORM.API.find = function(win){

    var API = null,
        findAttempts = 0,
        findAttemptLimit = 500,
        traceMsgPrefix = "SCORM.API.find",
        trace = lms.UTILS.trace,
        scorm = lms.SCORM;

    while ((!win.API && !win.API_1484_11) &&
           (win.parent) &&
           (win.parent != win) &&
           (findAttempts <= findAttemptLimit)){

                findAttempts++;
                win = win.parent;

    }

    //If SCORM version is specified by user, look for specific API
    if(scorm.version){

        switch(scorm.version){

            case "2004" :

                if(win.API_1484_11){

                    API = win.API_1484_11;

                } else {

                    trace(traceMsgPrefix +": SCORM version 2004 was specified by user, but API_1484_11 cannot be found.");

                }

                break;

            case "1.2" :

                if(win.API){

                    API = win.API;

                } else {

                    trace(traceMsgPrefix +": SCORM version 1.2 was specified by user, but API cannot be found.");

                }

                break;

        }

    } else {                             //If SCORM version not specified by user, look for APIs

        if(win.API_1484_11) {            //SCORM 2004-specific API.

            scorm.version = "2004";      //Set version
            API = win.API_1484_11;

        } else if(win.API){              //SCORM 1.2-specific API

            scorm.version = "1.2";       //Set version
            API = win.API;

        }

    }

    if(API){

        trace(traceMsgPrefix +": API found. Version: " +scorm.version);
        trace("API: " +API);

    } else {

        trace(traceMsgPrefix +": Error finding API. \nFind attempts: " +findAttempts +". \nFind attempt limit: " +findAttemptLimit);

    }

    return API;

};


/* -------------------------------------------------------------------------
   lms.SCORM.API.get()
   Looks for an object named API, first in the current window's frame
   hierarchy and then, if necessary, in the current window's opener window
   hierarchy (if there is an opener window).

   Parameters:  None.
   Returns:     Object if API found, null if no API found
---------------------------------------------------------------------------- */

lms.SCORM.API.get = function(){

    var API = null,
        win = window,
        scorm = lms.SCORM,
        find = scorm.API.find,
        trace = lms.UTILS.trace;

    API = find(win);

    if(!API && win.parent && win.parent != win){
        API = find(win.parent);
    }

    if(!API && win.top && win.top.opener){
        API = find(win.top.opener);
    }

    //Special handling for Plateau
    //Thanks to Joseph Venditti for the patch
    if(!API && win.top && win.top.opener && win.top.opener.document) {
        API = find(win.top.opener.document);
    }

    if(API){
        scorm.API.isFound = true;
    } else {
        trace("API.get failed: Can't find the API!");
    }

    return API;

};


/* -------------------------------------------------------------------------
   lms.SCORM.API.getHandle()
   Returns the handle to API object if it was previously set

   Parameters:  None.
   Returns:     Object (the lms.SCORM.API.handle variable).
---------------------------------------------------------------------------- */

lms.SCORM.API.getHandle = function() {

    var API = lms.SCORM.API;

    if(!API.handle && !API.isFound){

        API.handle = API.get();

    }

    return API.handle;

};



// ------------------------------------------------------------------------- //
// --- lms.SCORM.connection functions --------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   lms.SCORM.connection.initialize()
   Tells the LMS to initiate the communication session.

   Parameters:  None
   Returns:     Boolean
---------------------------------------------------------------------------- */

lms.SCORM.connection.initialize = function(){

    var success = false,
        scorm = lms.SCORM,
        completionStatus = scorm.data.completionStatus,
        trace = lms.UTILS.trace,
        makeBoolean = lms.UTILS.StringToBoolean,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.connection.initialize ";

    trace("connection.initialize called.");

    if(!scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

        if(API){

            switch(scorm.version){
                case "1.2" : success = makeBoolean(API.LMSInitialize("")); break;
                case "2004": success = makeBoolean(API.Initialize("")); break;
            }

            if(success){

                //Double-check that connection is active and working before returning 'true' boolean
                errorCode = debug.getCode();

                if(errorCode !== null && errorCode === 0){

                    scorm.connection.isActive = true;

                    if(scorm.handleCompletionStatus){

                        //Automatically set new launches to incomplete
                        completionStatus = scorm.status("get");

                        if(completionStatus){

                            switch(completionStatus){

                                //Both SCORM 1.2 and 2004
                                case "not attempted": scorm.status("set", "incomplete"); break;

                                //SCORM 2004 only
                                case "unknown" : scorm.status("set", "incomplete"); break;

                                //Additional options, presented here in case you'd like to use them
                                //case "completed"  : break;
                                //case "incomplete" : break;
                                //case "passed"     : break;    //SCORM 1.2 only
                                //case "failed"     : break;    //SCORM 1.2 only
                                //case "browsed"    : break;    //SCORM 1.2 only

                            }

                            //Commit changes
                            scorm.save();

                        }

                    }

                } else {

                    success = false;
                    trace(traceMsgPrefix +"failed. \nError code: " +errorCode +" \nError info: " +debug.getInfo(errorCode));

                }

            } else {

                errorCode = debug.getCode();

                if(errorCode !== null && errorCode !== 0){

                    trace(traceMsgPrefix +"failed. \nError code: " +errorCode +" \nError info: " +debug.getInfo(errorCode));

                } else {

                    trace(traceMsgPrefix +"failed: No response from server.");

                }
            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

          trace(traceMsgPrefix +"aborted: Connection already active.");

     }

     return success;

};


/* -------------------------------------------------------------------------
   lms.SCORM.connection.terminate()
   Tells the LMS to terminate the communication session

   Parameters:  None
   Returns:     Boolean
---------------------------------------------------------------------------- */

lms.SCORM.connection.terminate = function(){

    var success = false,
        scorm = lms.SCORM,
        exitStatus = scorm.data.exitStatus,
        completionStatus = scorm.data.completionStatus,
        trace = lms.UTILS.trace,
        makeBoolean = lms.UTILS.StringToBoolean,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.connection.terminate ";


    if(scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

        if(API){

             if(scorm.handleExitMode && !exitStatus){

                if(completionStatus !== "completed" && completionStatus !== "passed"){

                    switch(scorm.version){
                        case "1.2" : success = scorm.set("cmi.core.exit", "suspend"); break;
                        case "2004": success = scorm.set("cmi.exit", "suspend"); break;
                    }

                } else {

                    switch(scorm.version){
                        case "1.2" : success = scorm.set("cmi.core.exit", ""); break;
                        case "2004": success = scorm.set("cmi.exit", "normal"); break;
                    }

                }

            }

            //Ensure we persist the data
            success = scorm.save();

            if(success){

                switch(scorm.version){
                    case "1.2" : success = makeBoolean(API.LMSFinish("")); break;
                    case "2004": success = makeBoolean(API.Terminate("")); break;
                }

                if(success){

                    scorm.connection.isActive = false;

                } else {

                    errorCode = debug.getCode();
                    trace(traceMsgPrefix +"failed. \nError code: " +errorCode +" \nError info: " +debug.getInfo(errorCode));

                }

            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

        trace(traceMsgPrefix +"aborted: Connection already terminated.");

    }

    return success;

};



// ------------------------------------------------------------------------- //
// --- lms.SCORM.data functions --------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   lms.SCORM.data.get(parameter)
   Requests information from the LMS.

   Parameter: parameter (string, name of the SCORM data model element)
   Returns:   string (the value of the specified data model element)
---------------------------------------------------------------------------- */

lms.SCORM.data.get = function(parameter){

    var value = null,
        scorm = lms.SCORM,
        trace = lms.UTILS.trace,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.data.get('" +parameter +"') ";

    if(scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

          if(API){

            switch(scorm.version){
                case "1.2" : value = API.LMSGetValue(parameter); break;
                case "2004": value = API.GetValue(parameter); break;
            }

            errorCode = debug.getCode();

            //GetValue returns an empty string on errors
            //If value is an empty string, check errorCode to make sure there are no errors
            if(value !== "" || errorCode === 0){

                //GetValue is successful.
                //If parameter is lesson_status/completion_status or exit status, let's
                //grab the value and cache it so we can check it during connection.terminate()
                switch(parameter){

                    case "cmi.core.lesson_status":
                    case "cmi.completion_status" : scorm.data.completionStatus = value; break;

                    case "cmi.core.exit":
                    case "cmi.exit"     : scorm.data.exitStatus = value; break;

                }

            } else {

                trace(traceMsgPrefix +"failed. \nError code: " +errorCode +"\nError info: " +debug.getInfo(errorCode));

            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

        trace(traceMsgPrefix +"failed: API connection is inactive.");

    }

    trace(traceMsgPrefix +" value: " +value);

    return String(value);

};


/* -------------------------------------------------------------------------
   lms.SCORM.data.set()
   Tells the LMS to assign the value to the named data model element.
   Also stores the SCO's completion status in a variable named
   lms.SCORM.data.completionStatus. This variable is checked whenever
   lms.SCORM.connection.terminate() is invoked.

   Parameters: parameter (string). The data model element
               value (string). The value for the data model element
   Returns:    Boolean
---------------------------------------------------------------------------- */

lms.SCORM.data.set = function(parameter, value){

    var success = false,
        scorm = lms.SCORM,
        trace = lms.UTILS.trace,
        makeBoolean = lms.UTILS.StringToBoolean,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.data.set('" +parameter +"') ";


    if(scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

        if(API){

            switch(scorm.version){
                case "1.2" : success = makeBoolean(API.LMSSetValue(parameter, value)); break;
                case "2004": success = makeBoolean(API.SetValue(parameter, value)); break;
            }

            if(success){

                if(parameter === "cmi.core.lesson_status" || parameter === "cmi.completion_status"){

                    scorm.data.completionStatus = value;

                }

            } else {

                errorCode = debug.getCode();

                trace(traceMsgPrefix +"failed. \nError code: " +errorCode +". \nError info: " +debug.getInfo(errorCode));

            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

        trace(traceMsgPrefix +"failed: API connection is inactive.");

    }

	trace(traceMsgPrefix +" value: " +value);

    return success;

};


/* -------------------------------------------------------------------------
   lms.SCORM.data.save()
   Instructs the LMS to persist all data to this point in the session

   Parameters: None
   Returns:    Boolean
---------------------------------------------------------------------------- */

lms.SCORM.data.save = function(){

    var success = false,
        scorm = lms.SCORM,
        trace = lms.UTILS.trace,
        makeBoolean = lms.UTILS.StringToBoolean,
        traceMsgPrefix = "SCORM.data.save failed";


    if(scorm.connection.isActive){

        var API = scorm.API.getHandle();

        if(API){

            switch(scorm.version){
                case "1.2" : success = makeBoolean(API.LMSCommit("")); break;
                case "2004": success = makeBoolean(API.Commit("")); break;
            }

        } else {

            trace(traceMsgPrefix +": API is null.");

        }

    } else {

        trace(traceMsgPrefix +": API connection is inactive.");

    }

    return success;

};


lms.SCORM.status = function (action, status){

    var success = false,
        scorm = lms.SCORM,
        trace = lms.UTILS.trace,
        traceMsgPrefix = "SCORM.getStatus failed",
        cmi = "";

    if(action !== null){

        switch(scorm.version){
            case "1.2" : cmi = "cmi.core.lesson_status"; break;
            case "2004": cmi = "cmi.completion_status"; break;
        }

        switch(action){

            case "get": success = scorm.data.get(cmi); break;

            case "set": if(status !== null){

                            success = scorm.data.set(cmi, status);

                        } else {

                            success = false;
                            trace(traceMsgPrefix +": status was not specified.");

                        }

                        break;

            default      : success = false;
                        trace(traceMsgPrefix +": no valid action was specified.");

        }

    } else {

        trace(traceMsgPrefix +": action was not specified.");

    }

    return success;

};


// ------------------------------------------------------------------------- //
// --- lms.SCORM.debug functions -------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   lms.SCORM.debug.getCode
   Requests the error code for the current error state from the LMS

   Parameters: None
   Returns:    Integer (the last error code).
---------------------------------------------------------------------------- */

lms.SCORM.debug.getCode = function(){

    var scorm = lms.SCORM,
        API = scorm.API.getHandle(),
        trace = lms.UTILS.trace,
        code = 0;

    if(API){

        switch(scorm.version){
            case "1.2" : code = parseInt(API.LMSGetLastError(), 10); break;
            case "2004": code = parseInt(API.GetLastError(), 10); break;
        }

    } else {

        trace("SCORM.debug.getCode failed: API is null.");

    }

    return code;

};


/* -------------------------------------------------------------------------
   lms.SCORM.debug.getInfo()
   "Used by a SCO to request the textual description for the error code
   specified by the value of [errorCode]."

   Parameters: errorCode (integer).
   Returns:    String.
----------------------------------------------------------------------------- */

lms.SCORM.debug.getInfo = function(errorCode){

    var scorm = lms.SCORM,
        API = scorm.API.getHandle(),
        trace = lms.UTILS.trace,
        result = "";


    if(API){

        switch(scorm.version){
            case "1.2" : result = API.LMSGetErrorString(errorCode.toString()); break;
            case "2004": result = API.GetErrorString(errorCode.toString()); break;
        }

    } else {

        trace("SCORM.debug.getInfo failed: API is null.");

    }

    return String(result);

};


/* -------------------------------------------------------------------------
   lms.SCORM.debug.getDiagnosticInfo
   "Exists for LMS specific use. It allows the LMS to define additional
   diagnostic information through the API Instance."

   Parameters: errorCode (integer).
   Returns:    String (Additional diagnostic information about the given error code).
---------------------------------------------------------------------------- */

lms.SCORM.debug.getDiagnosticInfo = function(errorCode){

    var scorm = lms.SCORM,
        API = scorm.API.getHandle(),
        trace = lms.UTILS.trace,
        result = "";

    if(API){

        switch(scorm.version){
            case "1.2" : result = API.LMSGetDiagnostic(errorCode); break;
            case "2004": result = API.GetDiagnostic(errorCode); break;
        }

    } else {

        trace("SCORM.debug.getDiagnosticInfo failed: API is null.");

    }

    return String(result);

};


// ------------------------------------------------------------------------- //
// --- Shortcuts! ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //

// Because nobody likes typing verbose code.

lms.SCORM.init = lms.SCORM.connection.initialize;
lms.SCORM.get  = lms.SCORM.data.get;
lms.SCORM.set  = lms.SCORM.data.set;
lms.SCORM.save = lms.SCORM.data.save;
lms.SCORM.quit = lms.SCORM.connection.terminate;



// ------------------------------------------------------------------------- //
// --- lms.UTILS functions -------------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   lms.UTILS.StringToBoolean()
   Converts 'boolean strings' into actual valid booleans.

   (Most values returned from the API are the strings "true" and "false".)

   Parameters: String
   Returns:    Boolean
---------------------------------------------------------------------------- */

lms.UTILS.StringToBoolean = function(value){
    var t = typeof value;
    switch(t){
       //typeof new String("true") === "object", so handle objects as string via fall-through.
       //See https://github.com/lms/scorm-api-wrapper/issues/3
       case "object":
       case "string": return (/(true|1)/i).test(value);
       case "number": return !!value;
       case "boolean": return value;
       case "undefined": return null;
       default: return false;
    }
};



/* -------------------------------------------------------------------------
   lms.UTILS.trace()
   Displays error messages when in debug mode.

   Parameters: msg (string)
   Return:     None
---------------------------------------------------------------------------- */

lms.UTILS.trace = function(msg){

     if(lms.debug.isActive){

        if(window.console && window.console.log){
            window.console.log(msg);
        } else {
            //alert(msg);
        }

     }
};
