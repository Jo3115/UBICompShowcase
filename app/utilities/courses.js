import { StoreData } from "./asyncStorage";
import { CalculateDistance } from "./distance";


export async function GetCourse(name, setLoading) {
    try {
        const response = await fetch(`https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse?name=${name}`);
        const json = await response.json();
        StoreData("@current_course", json);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}

export async function GetAllCourseByDistance(location, setOut, setLoading) {
    try {
        const response = await fetch(`https://europe-west2-ubicompshowcase.cloudfunctions.net/getCourse`);
        const json = await response.json();
        setOut(OrderCourses(location, json))
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}


export function OrderCourses(locationLatLon, courses) {
    distances = []
    for (course in courses){
        let courseLatLon = { latitude: course.course[0]["middle"].lat, longitude: course.course[0]["middle"].lon }
        distances.push({
            distance: CalculateDistance(locationLatLon, courseLatLon, "m"),
            name: "course"
        })
    }
    console.log(distances)
    return distances
}