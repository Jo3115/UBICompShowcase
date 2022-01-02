/**
 * @fileoverview this file contains functions to handle course information
 */
import { GetData, RemoveKey, ReturnGetAllKeys, StoreCourse } from "./asyncStorage";
import { CalculateDistance } from "./distance";
import { IsConnectedToInternet } from "./network";

/**
 * SaveGetCourse, function gets a course with given name and stores it in async storage
 * @param {string} name - the course name
 */
export async function SaveGetCourse(name) {
    try {
        const response = await fetch(`https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse?name=${name}`);
        const json = await response.json();
        StoreCourse(name, json);
    } catch (error) {
        console.error(error);
    }
}

/**
 * RemoveCourse, function remove a course from async storage
 * @param {string} name - the course name
 */
export async function RemoveCourse(name) {
    try {
        await RemoveKey(`course-${name}`)
    } catch (error) {
        console.error(error);
    }
}

/**
 * GetAllCourseByDistance, function gets a list of courses and orders them bassed on distance. 
 * if user is connected to the internet it returns a list from the api
 * if the user is not connected it returns a list of downloaded courses from storage
 * @param {object} location - object containing lat, long representing the location to order by
 * @param {object} setCourses - useState to hold the returned courses
 * @param {object} setLoading - useState to say function is complete
 */
export async function GetAllCourseByDistance(location, setCourses, setLoading) {
    try {
        let json
        if (await IsConnectedToInternet()) {
            let response = await fetch("https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse");
            json = await response.json()
        } else {
            json = await getDownlodedCourses()
        }
        let orderedCourses = await orderCourses(location, json)
        await setCourses(orderedCourses)
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}

/**
 * CheckDownloaded, function checks which courses in a list are downloaded to display their download status
 * @param {array} coursesIn - array containing course information objects
 * @param {string} setCourses - useState set to update with the returned courses
 * @param {array} setLoading - array containing list of downloaded courses
 */
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

/**
 * getDownlodedCourses, function maps downloaded courses to the course name
 * @returns {object} - object containing course names followed by course information
 */
async function getDownlodedCourses() {
    let keys = await ReturnGetAllKeys()
    let coursesOut = {}
    for (let index in keys) {
        if (keys[index].includes("course-")) {
            let courseInfoJson = await GetData(keys[index])
            const courseInfo = (courseInfoJson != null ? JSON.parse(courseInfoJson) : null)
            coursesOut[keys[index].replace("course-", "")] = courseInfo
        }
    }
    return coursesOut
}

/**
 * orderCourses, function sorts courses by distance from given lat lon
 * @param {object} locationLatLon - object containing lat, long representing the location to order by
 * @param {array} coursesIn - array containing course information objects
 * @returns {array} - array of courses sorted by distance
 */
function orderCourses(locationLatLon, coursesIn) {
    distances = []
    for (course in coursesIn) {
        let courseLatLon = { latitude: coursesIn[course].cource[0]["middle"].lat, longitude: coursesIn[course].cource[0]["middle"].lon }
        distances.push({
            distance: CalculateDistance(locationLatLon, courseLatLon, "m"),
            name: course
        })
    }
    return distances.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
}