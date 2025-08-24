import React, { useEffect, useState } from "react";
import { FaUserCircle, FaHome, FaPhone, FaSave } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

function ProfilePage() {
  const { user, token } = useAuth(); // token from context
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [address, setAddress] = useState({});
  const [mobile, setMobile] = useState("");
  const accessToken = localStorage.getItem('accessToken');
  console.log("something happened");
  console.log("token ",token);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMember = async () => {
        console.log("token ",token);
      try {
        const res = await fetch(
          `http://localhost:8082/api/v1/members/${encodeURIComponent(
            user.email
          )}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch member profile");
        }

        const data = await res.json();
        setMember(data);

        // Pre-fill editable fields
        if (data.addresses && data.addresses.length > 0) {
          setAddress(data.addresses.find((a) => a.primary) || data.addresses[0]);
        }
        if (data.contacts && data.contacts.length > 0) {
          const phone = data.contacts.find(
            (c) => c.method === "PHONE" && c.primary
          );
          if (phone) setMobile(phone.value);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [user, token]);

  const handleSave = async () => {
    if (!member) return;

    const updated = {
      ...member,
      addresses: [address],
      contacts: [
        ...(member.contacts || []).filter((c) => c.method !== "PHONE"),
        {
          type: "MOBILE",
          value: mobile,
          method: "PHONE",
          primary: true,
        },
      ],
    };

    try {
      const res = await fetch(
        `http://localhost:8082/api/v1/members/${encodeURIComponent(
          member.email
        )}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const saved = await res.json();
      setMember(saved);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-xl text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <p className="text-xl text-red-700">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <FaUserCircle className="text-indigo-600 text-8xl mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900">
            {member.firstName} {member.lastName}
          </h1>
          <p className="text-gray-600">{member.email}</p>
          <p className="text-sm text-gray-500">
            Member Since:{" "}
            {member.memberSince
              ? format(new Date(member.memberSince), "MMMM d, yyyy")
              : "Not available"}
          </p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaHome className="text-blue-500 mr-2" /> Address
            </h2>
            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street"
                  value={address.street || ""}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Suburb"
                  value={address.suburb || ""}
                  onChange={(e) =>
                    setAddress({ ...address, suburb: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={address.city || ""}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={address.state || ""}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  value={address.postCode || ""}
                  onChange={(e) =>
                    setAddress({ ...address, postCode: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ) : (
              <p>
                {address.street}, {address.suburb}, {address.city},{" "}
                {address.state} {address.postCode}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaPhone className="text-green-500 mr-2" /> Mobile
            </h2>
            {editMode ? (
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p>{mobile || "Not provided"}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-10 space-x-4">
          {editMode ? (
            <button
              onClick={handleSave}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition transform hover:scale-105"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
