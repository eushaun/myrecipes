import axios from "axios";

const getUser = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/user', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const editUser = async (user) => {
  try {
    const u = JSON.parse(localStorage.getItem("user"));
    if (user.get("profilePic") && !user.get("profilePic").startsWith("https://myrecipes-images")) u.profilePic = 'https://myrecipes-images.s3.us-east-2.amazonaws.com/profile/' + user.get("profilePic");

    if (!u.profilePic) u.profilePic = "";
    const res = await axios.put('http://localhost:3000/user', user);
    localStorage.setItem("user", JSON.stringify({uid: u.uid, firstName: user.get("firstName"), profilePic: u.profilePic}));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const deleteUser = async (uid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/user/${uid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const subscribe = async (user) => {
  try {
    const res = await axios.post('http://localhost:3000/user/subscribe', user);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const unsubscribe = async (subid, conid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/user/unsubscribe/${subid}/${conid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUser,
  editUser,
  deleteUser,
  subscribe,
  unsubscribe
};
