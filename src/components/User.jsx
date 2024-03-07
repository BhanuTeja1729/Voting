import dashboardImage from "/dashboard.jpeg";


const User = () => {
  return (
    <>
    <>
      <div className="flex justify-center items-center">
        <div className="container w-full mt-20 flex flex-col md:flex-row bg-white shadow-md rounded-xl px-5 py-5 ">
          <div className="flex-1">
            <img
              src={dashboardImage}
              alt="Dashboard"
              className="w-full h-auto rounded-xl md:rounded-l-xl"
            />
          </div>

          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              
            </div>

            <div className="flex flex-col items-center">
              
            </div>
          </div>
        </div>
      </div>
    </>
    </>
  )
}

export default User
