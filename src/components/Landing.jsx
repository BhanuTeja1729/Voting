import { useNavigate } from "react-router-dom";
import dashboardImage from "/dashboard.jpeg";

const Landing = () => {
  const navigate = useNavigate();

  const userSignup = () => {
    navigate("/user/signup");
  };

  const userLogin = () => {
    navigate("/user/signup");
  };

  const adminLogin = () => {
    navigate("/admin");
  };

  return (
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
              <h2 className="text-4xl font-bold mb-8">Voter Registration</h2>
              <br />
              <button
                onClick={userSignup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
              >
                Register
              </button>
              <br />
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold mb-8">Voter Login</h2>
              <br />
              <button
                onClick={userLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
              >
                User Login
              </button>
              <br />
              <button
                onClick={adminLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
