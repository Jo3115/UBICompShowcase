import { GetAllKeys, GetData, RemoveKey, ReturnGetAllKeys, StoreData } from "./asyncStorage";
import { CalculateDistance } from "./distance";
import { IsConnectedToInternet } from "./network";


export async function SaveGetCourse(name) {
    try {
        const response = await fetch(`https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse?name=${name}`);
        const json = await response.json();
        StoreData(name, json);
    } catch (error) {
        console.error(error);
    } 
}

export async function RemoveCourse(name) {
    try {
        await RemoveKey(`course-${name}`)
    } catch (error) {
        console.error(error);
    } 
}


export async function GetAllCourseByDistance(location, setCourses, setLoading) {
    try {
        let json
        if (await IsConnectedToInternet()){
            let response = await fetch("https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse");
            json = await response.json()
        } else {
            json = await getDownlodedCourses()
            console.log(json)
        }
        let orderedCourses = await orderCourses(location, json)
        await setCourses(orderedCourses)
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}

export function CheckDownloaded(coursesIn, setCourses, download) {
    let courses = coursesIn
    courses.forEach((course, index) => {
        checkString = `course-${course.name}`
        let courseOut = course
        if (download.indexOf(checkString) > -1) {
            courseOut["downloaded"] = "downloaded"
        } else {
            courseOut["downloaded"] = "download"
        }
        courses[index] = courseOut
    })
    setCourses(courses)
}

async function getDownlodedCourses() {
    let keys = await ReturnGetAllKeys()
    let coursesOut = {}
    for (let index in keys){
        if (keys[index].includes("course-")){
            let courseInfoJson = await GetData(keys[index])
            const courseInfo = (courseInfoJson != null ? JSON.parse(courseInfoJson) : null)
            coursesOut[keys[index].replace("course-", "")] = courseInfo
        }
    }
    return coursesOut
}

function orderCourses(locationLatLon, coursesIn) {
    distances = []
    for (course in coursesIn){
        let courseLatLon = { latitude: coursesIn[course].cource[0]["middle"].lat, longitude: coursesIn[course].cource[0]["middle"].lon }
        distances.push({
            distance: CalculateDistance(locationLatLon, courseLatLon, "m"),
            name: course
        })
    }
    return distances.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
}