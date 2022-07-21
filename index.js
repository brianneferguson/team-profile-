//  write function for manager and intern, build team function,page template(bootstrap)
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const inquirer = require("inquirer") 
const path = require("path")
const fs = require("fs")
const outputDirectory = path.resolve(__dirname,"output")
const outputVariable = path.join(outputDirectory,"team.html") 
const pageTemplate = require("./src/page-template") 

const teamMember = []
const teamMemberId = [] 

function createManager(){
    inquirer.prompt(
        [
            {
                type:"input",
                name:"managername",
                messgae:"what is your manager name?",
            },
            {
                type:"input",
                name:"managerid",
                message:"what is your manager id?"


            },
            {
                type:"input",
                name:"manageremail",
                message:"what is your manager email?",
            },
            {
                type:"input",
                name:"officenumber",
                message:"what is your office number?",
            }
        ]
    ) 
    .then(answers => {
        const manager = new Manager(answers.managerid,answers.managername,answers.manageremail,answers.officenumber)
        teamMember.push(manager) 
        teamMemberId.push(answers.managerid)
        createRestOfTeam()
    } )
}
function createRestOfTeam(){
    inquirer.prompt(
        [
            {
                type:"list",
                name:"team",
                message:"what type of team member would you like to add?",
                choices:[
                    "intern","engineer","no one"
                ]
            }
        ]
    )
    .then(inputChoices =>{
        switch (inputChoices.team) {
            case "intern":
                addIntern()
                break;
                case "engineer":
                    addEngineer()

                break;
                
        
            default:
                buildTeam()
        }
    })
    function addEngineer(){
        inquirer.prompt(
            [
                {
                    type:"input",
                    name:"engineername",
                    messgae:"what is your engineer name?",
                },
                {
                    type:"input",
                    name:"engineerid",
                    message:"what is your engineer id?"
    
    
                },
                {
                    type:"input",
                    name:"engineeremail",
                    message:"what is your engineer email?",
                },
                {
                    type:"input",
                    name:"github",
                    message:"what is your github?",
                }
            ]
        ) 
        .then(answers => {
            const engineer = new Engineer(answers.engineerid,answers.engineername,answers.engineeremail,answers.github)
            teamMember.push(engineer) 
            teamMemberId.push(answers.engineerid)
            createRestOfTeam()
        } )
    }
    function addintern(){
        inquirer.prompt(
            [
                {
                    type:"input",
                    name:"internname",
                    messgae:"what is your intern name?",
                },
                {
                    type:"input",
                    name:"internid",
                    message:"what is your intern id?"
    
    
                },
                {
                    type:"input",
                    name:"internemail",
                    message:"what is your manager email?",
                },
                {
                    type:"input",
                    name:"schoolname",
                    message:"what is your school name?",
                }
            ]
        ) 
        .then(answers => {
            const intern = new Intern(answers.internid,answers.internname,answers.internemail,answers.schoolname)
            teamMember.push(intern) 
            teamMemberId.push(answers.internid)
            createRestOfTeam()
        } )
    }
}
// function createEngineer(){
//     inquirer.prompt(
//         [
//             {
//                 type:"input",
//                 name:"engineername",
//                 messgae:"what is your engineer name?",
//             },
//             {
//                 type:"input",
//                 name:"engineerid",
//                 message:"what is your engineer id?"


//             },
//             {
//                 type:"input",
//                 name:"engineeremail",
//                 message:"what is your engineer email?",
//             },
//             {
//                 type:"input",
//                 name:"github",
//                 message:"what is your github?",
//             }
//         ]
//     ) 
//     .then(answers => {
//         const engineer = new Engineer(answers.engineerid,answers.engineername,answers.engineeremail,answers.github)
//         teamMember.push(engineer) 
//         teamMemberId.push(answers.engineerid)
//         createRestOfTeam()
//     } )
// }
// function createintern(){
//     inquirer.prompt(
//         [
//             {
//                 type:"input",
//                 name:"internname",
//                 messgae:"what is your intern name?",
//             },
//             {
//                 type:"input",
//                 name:"internid",
//                 message:"what is your intern id?"


//             },
//             {
//                 type:"input",
//                 name:"internemail",
//                 message:"what is your manager email?",
//             },
//             {
//                 type:"input",
//                 name:"schoolname",
//                 message:"what is your school name?",
//             }
//         ]
//     ) 
//     .then(answers => {
//         const intern = new Intern(answers.internid,answers.internname,answers.internemail,answers.schoolname)
//         teamMember.push(intern) 
//         teamMemberId.push(answers.internid)
//         createRestOfTeam()
//     } )
// }
function buildTeam(){
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory)
}
fs.writeFileSync(outputVariable,pageTemplate(teamMember),"utf8")
} 
createManager()