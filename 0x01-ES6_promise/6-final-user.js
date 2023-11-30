import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  return Promise.allSettled([
    signUpUser(firstName, lastName),
    uploadPhoto(fileName),
  ]).then((values) => {
    const arr = [];
    for (const item of values) {
      arr.push({ status: item.status, value: item.value || item.reason });
    }
    return arr;
  }).catch((error) => {
    const arr = [];
    for (const item of values) {
      arr.push({ status: item.status, value: error.value || error.reason });
    }
    return arr;
  });
}

handleProfileSignup('Bob', 'Dylan', 'bob_dylan.jpg').then((data) => console.log(data));
