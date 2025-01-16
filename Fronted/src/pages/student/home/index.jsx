{studentViewCoursesList.map((courseItem) => (
  <div
    key={courseItem?._id} // Add the key prop here
    onClick={() => handleCourseNavigate(courseItem?._id)}
    className="overflow-hidden border rounded-lg shadow cursor-pointer"
  >
    <img
      src={courseItem?.image}
      width={300}
      height={150}
      className="object-cover w-full h-40"
    />
    <div className="p-4">
      <h3 className="mb-2 font-bold">{courseItem?.title}</h3>
      <p className="mb-2 text-sm text-gray-700">
        {courseItem?.instructorName}
      </p>
      <p className="font-bold text-[16px]">
        ${courseItem?.pricing}
      </p>
    </div>
  </div>
))}
