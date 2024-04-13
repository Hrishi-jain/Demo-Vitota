import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ProfileSection = () => {
  const [selectedSection, setSelectedSection] = useState('');

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
      <div className='w-full h-[100px] bg-blue-300 relative px-20 flex items-center justify-between mt-40 pt-30'>
        <p className='text-lg font-bold'>Profile</p>
        <div className="text-lg">
          <NavLink className={(e) => (e.isActive ? "text-black font-bold text-lg" : "text-black text-lg")} to="/">Home</NavLink>
          <span className='mx-2'>/</span>
          <NavLink className={(e) => (e.isActive ? "text-black font-bold text-lg" : "text-black font-bold text-lg")} to="/eyes">Profile</NavLink>
        </div>
      </div>

      <div className="flex items-center max-w-5xl mx-auto border-4 border-gray-200 rounded-xl p-5 px-10 justify-between mb-6 mt-10">
          <div className="flex items-center">
            <img
              src="https://media.licdn.com/dms/image/C4E03AQGg7UPswASmiw/profile-displayphoto-shrink_800_800/0/1627022976454?e=2147483647&v=beta&t=OPU4e8y4iX6LplpBbx9fVM6hHVwy3bRMiwOxtsXszdM"
              alt="Profile"
              className="h-24 w-24 rounded-xl "
            />
            <h2 className="text-xl font-extrabold text-gray-800 ml-4">Hello <br/><span className='text-lg font-semibold'>Hrishi Jain</span></h2>
          </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900">Edit </button>
        </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex">
          {/* Dropdown Menu */}
          <div className="w-1/4">
            <div className="bg-white shadow sm:rounded-lg mb-10 mr-5">
              <div className=" py-5 sm:px-6">
                <h3 className="text-xl leading-6 font-medium text-gray-900 mb-10">Profile Sections</h3>
                <ul className="space-y-3 ">
                  <li onClick={() => handleSectionClick('Account Information')} className="cursor-pointer hover:text-blue-500">Account Information</li>
                  <li onClick={() => handleSectionClick('My Orders')} className="cursor-pointer hover:text-blue-500">My Orders</li>
                  <li onClick={() => handleSectionClick('My Wishlist')} className="cursor-pointer hover:text-blue-500">My Wishlist</li>
                  <li onClick={() => handleSectionClick('Logout')} className="cursor-pointer hover:text-blue-500">Logout</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Display Details */}
          <div className="w-3/4">
            {selectedSection && (
              <div className="bg-white shadow sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">{selectedSection}</h3>
                  {/* Details based on selected section */}
                  {selectedSection === 'Account Information' && (
                    <div className="mt-5 max-w-xl text-sm text-gray-500">
                      <p>Name: Hrishi jain</p>
                      <p>Email: hrishijain@example.com</p>
                      <p>Phone: +1 123-456-7890</p>
                    </div>
                  )}
                  {selectedSection === 'My Orders' && (
                    <div className="mt-2 max-w-xl text-sm pt-5 text-gray-500">
                        <h3>This is your Orders</h3>
                      {/* Display My Orders */}
                    </div>
                  )}
                  {selectedSection === 'My Wishlist' && (
                    <div className="mt-2 max-w-xl text-sm pt-5 text-gray-500">
                        <h3>Here is the Hottest Wishlist</h3>
                      {/* Display My Stuff */}
                    </div>
                  )}
                  {selectedSection === 'Logout' && (
                    <div className="mt-2 max-w-xl text-sm pt-5 text-gray-500">
                      <p>Logout functionality goes here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
