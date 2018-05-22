const lib = require('lib')({token:'Zi8lcUH849MlHdVmRPHksvooF67y8AjxY46hvelk9qL047Ok2uSHcLrqTGHo0flZ'});

let getNumber=function(name1){
    let phone={};
    switch(name1.toLowerCase()){
        case "phil": 
            phone.num='19057675517'
            phone.fname='Phil'
            break;
        case "erin": 
            phone.num='16478804766'
            phone.fname='Erin'
            break;
        case "matt": 
            phone.num='12896008832'
            phone.fname='Matt'
            break;
        case "kunal": 
            phone.num='16138643917'
            phone.fname='Kunal'
            break;
        case "ben": 
            phone.num='19054423476'
            phone.fname='Ben'
            break;
        case "kyle":
            phone.num='19053910733'
            phone.fname='Kyle'
            break;
        case "chris":
            phone.num='19056198517'
            phone.fname='Chris'
            break;
        default:
        	phone.num='19057675517'
            phone.fname=name1
            break;

    }
    return phone;

};

let currentStage=0;
let names_list='';
let message_body='';

/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} name message sent to recipient
* @returns {any}
*/
module.exports = (name="Default Message", context, callback) => {

	if(currentStage==0){
		currentStage++;
		names_list = name;
		console.log('Parameter: ' + name);
		return callback(null, {
			text: "What do you want to say?",
			shouldEndSession: false
		})
	}
	else{
		
		message_body = name;

		let namezzz = names_list;
		let contacts=[];
	    let test1=namezzz.split(" ");
	    //let test2=name.split(" ")[1];
	    for (var i=0; i<test1.length; i++){
	        contacts.push(getNumber(test1[i]));    
	    }
	    
	    //map all phone numbers to sms email 
	    let promises = contacts.map(contact => {
	        return lib.messagebird.tel.sms({
	             originator: '12048170606',
	             recipient: contact['num'],
	             body: name
	         });
	    });

	    //promises multilib 
	    //promise class all concurrently running promises, afterwards call back results
	    Promise.all(promises).then(results => 
	    {
	    	currentStage=0;
	    	return callback(null, {
	    		text: "Message Sent!",
	    		shouldEndSession: true
	    	})
	    }).catch(error =>{
	        return callback(error)
	    })



	}





	// console.log('helo...');
	// for(var i=0; i < 500000000; i++){}
	// console.log('...helo...');
	// //context/path[1] --> returns the intent
 //  	//return callback(null, `Message: ${this}`);
 //  	let ogContext = context.path[1];
 //  	if(context.path[1] === "Message"){
 //  		//name --> list of contacts --> need to be seperated



 //  		//name = "We MADE IT MAMMA";
 //  		//context.path[1] = 'HelloWorld';

 //  		//return callback(null, name);
 //  		// response.reprompt = {
 //    //         "outputSpeech":{
 //    //             "type": "PlainText",
 //    //             "text": "What do you want to write?"
 //    //         }
 //    //     };


 //  		return lib[`${context.service.identifier}.intents.HelloWorld`](name, context, callback);
 //  		//return (name=name, context, callback) => {};
 //  	}
 //  	//context.path[1] = 'HelloWorld';



 //      // callback

 //   	//let myVar = context.service.environment.sessionAttributes;
 //    // lib.messagebird.tel.sms({
 //    //   originator: '12048170606',
 //    //   recipient: '12896008832',
 //    //   body: name
 //    // }, (err, result) => {
 //    //   return callback(err, 'Message Sent!');
 //    // });

};