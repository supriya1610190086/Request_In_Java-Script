var fs = require('fs');
const axios = require('axios');
let readlineSync = require("readline-sync");

axios.get("http://saral.navgurukul.org/api/courses").then(resp => {
    Data = resp.data;
    let file = JSON.stringify(Data)
    fs.writeFileSync("cources.txt", file)
    console.log("")
    console.log("***** Welcome to navgurukul and Learn basic programming launguage *****")
    console.log("")
    serial_no = 1
    for (let i in Data['availableCourses']) {
        console.log(serial_no, Data['availableCourses'][i]["name"], Data['availableCourses'][i]["id"])
        serial_no = serial_no + 1
        console.log("")
    }
    user_input = parseInt(readlineSync.question("Enter your courses number that you want to learn:- "))
    parent_id = Data["availableCourses"][user_input - 1]["id"]
    console.log(Data["availableCourses"][user_input - 1]["name"])

    axios.get("http://saral.navgurukul.org/api/courses/" + (Data["availableCourses"][user_input - 1]["id"]) + "/exercises").then(resp => {
        Data_1 = resp.data;
        let file_1 = JSON.stringify(Data_1)
        fs.writeFileSync("parentes.txt", file_1)
        serial_no_1 = 0
        for (let i in Data_1["data"]) {
            console.log("      ", serial_no_1 + 1, ".", Data_1['data'][i]["name"])
            if (Data_1['data'][i]["childExercises"].length > 0) {
                s = 0
                for (let j in Data_1['data'][i]['childExercises']) {
                    s = s + 1
                    console.log("               ", s, Data_1['data'][i]['childExercises'][j]["name"])
                }
            } else {
                console.log("                1", Data_1['data'][i]["slug"])
            }
            serial_no_1 += 1
        }
        choose_topic_no = parseInt(readlineSync.question("entre the specific parent exercises : "))
        parent_no = Data_1["data"][choose_topic_no - 1]["name"]
        child_id = Data_1["data"][choose_topic_no - 1]["id"]
        console.log(choose_topic_no, parent_no, child_id)

        if (Data_1["data"][choose_topic_no - 1]["childExercises"] == []) {
            console.log("     1.", Data_1["data"][choose_topic_no - 1]["slug"])
        } else {
            l = 0
            while (l < Data_1["data"][choose_topic_no - 1]["childExercises"].length) {
                console.log("     ", l + 1, Data_1["data"][choose_topic_no - 1]["childExercises"][l]["name"])
                l = l + 1
            }
            choose_child_no = parseInt(readlineSync.question("entre the specific child exercises : "))
            slug = (Data_1["data"][choose_topic_no - 1]["childExercises"][choose_child_no - 1]["slug"])
            axios.get("http://saral.navgurukul.org/api/courses/" + (parent_id) + "/exercise/getBySlug?slug=" + slug).then(resp => {
                Data_3 = resp.data;
                let file_3 = JSON.stringify(Data_3)
                fs.writeFileSync("topic.txt", file_3)
                console.log(Data_3["content"])
            })
        }
    });
}).catch((error) => {
    console.log("error ")
}).catch((error) => {
    console.log("error")
}).catch((error) => {
    console.log("error")
});