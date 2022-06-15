const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let del = {};
let temp = {};
let list = [];
function ask(){
    rl.question('Awaiting for command ', (answer) => {
        if (answer === "/help"){
            console.log("Here are bunch of commands you can use :");
            console.log("/stop to stop");
            console.log("/add to add");
            console.log("/list to list");
            console.log("/delete to delete");
        } else if(answer === "/stop"){
            console.log("Application Stopped !");
            process.exit();
        } else if(answer === "/add"){
            name();
        }
        else if(answer === "/list"){
            if (!list.length > 0){
                console.log("Aucun Contact !");
            } else {
                for(const contact of list){
                    console.log("-----------");
                    console.log("Id: " + contact.id);
                    console.log("Prénom: " + contact.name);
                    console.log("Nom de Famille: " + contact.family);
                    console.log("tel: " + contact.number);
                    
                }
            }
        }
        else if(answer === "/delete"){
            contactId();
        } else {
            console.log("Unknow command type /help to list all commands");
        }
        ask();
    });
}
function name(){
    rl.question('What is the first name ', (answer) => {
        temp.name = answer;
        family();
    });
}
function family(){
    rl.question('What is the family name ', (answer) => {
        temp.family = answer;
        number()
    });
}
function number(){
    rl.question('What is the phone number ', (answer) => {
        var number = Verifier_Numero_Telephone(answer);

        if ( number == true ){
            temp.number = answer;
            let a = list.length + 1;
            temp.id = a.toString();
            list.push(temp);
            temp = {};
        } else {
            console.log("Le numéro de téléphone n'es pas valide, veuillez recommencer l'opération.");
            temp = {};
        }
        ask();
    });
}
function contactId(){
    rl.question('ID of the contact ', (answer) => {
        let i = 0;
        isdelete = false;
        for(contact of list){
            if (contact.id === answer){
                list.splice(i,1);
                isdelete = true;
            }
            i++;
        }
        del = {};
        if(isdelete===true){
            console.log("contact supprimé");
        } else {
            console.log("contact introuvable");
        }
        ask();
    });
}
function Verifier_Numero_Telephone(num_tel){
    var regex = new RegExp(/^(06)[0-9]{8}/gi);

    if(regex.test(num_tel)){
        return(true);
    } 
    else
    {
        return(false);
	}
}
ask();