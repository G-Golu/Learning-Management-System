import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
    }
    console.log(response);
  }
  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-8 text-3xl font-bold">My Courses</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardContent className="flex-grow p-4">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="object-cover w-full mb-4 rounded-md h-52"
                />
                <h3 className="mb-1 font-bold">{course?.title}</h3>
                <p className="mb-2 text-sm text-gray-700">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="flex-1"
                >
                  <Watch className="w-4 h-4 mr-2" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses found</h1>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;