import React, { useEffect, useState } from "react";
import axios from "axios";
export const UserForm = () => {
  const education = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];
  const skillItems = [
    { value: "skill1", label: "skill 1" },
    { value: "skill2", label: "skill 2" },
    { value: "skill3", label: "skill 3" },
    { value: "skill4", label: "skill 4" },
  ];

  const [submitState, setSubmitState] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    education: "",
    gender: "",
    phone: "",
    email: "",
  });

  const [fectchData, setFetchData] = useState([]);
  localStorage.setItem("storedFetchedData", JSON.stringify(fectchData));

  const handleSkillsChange = (e) => {
    const skills = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setInputValues({
      ...inputValues,
      skills,
    });
  };

  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const addData = () => {
    axios
      .post("https://edstem-backend.onrender.com/add", inputValues)
      .then((res) => {
        alert("data added successfully");
        getData();
      })
      .catch((err) => console.log(err));
  };
  const getData = () => {
    axios
      .get("https://edstem-backend.onrender.com/get")
      .then((res) => setFetchData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    console.log("submitState", submitState);
  }, [submitState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(!submitState);
    addData();
    getData();

    console.log("inputValues", inputValues);
  };

  const reverseData = fectchData.reverse();
  //   console.log(reverseData);

  return (
    <div className="formSection">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputValues}
          name="name"
          value={inputValues.name}
          type="text"
          placeholder="Enter Name"
        />

        <select
          onChange={handleInputValues}
          name="education"
          value={inputValues.education}
        >
          <option>Select Education</option>
          {education.map((e, i) => {
            return <option value={e.value}>{e.label}</option>;
          })}
        </select>
        <select
          multiple
          name="skills"
          value={inputValues.skills}
          onChange={handleSkillsChange}
        >
          <option>Select Skills</option>
          {skillItems.map((e, i) => {
            return (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            );
          })}
        </select>

        <select name="gender" onChange={handleInputValues}>
          <option>Select Gender</option>
          <option type="radio" value="male">
            Male
          </option>
          <option type="radio" value="female">
            Female
          </option>
          <option type="radio" value="other">
            Other
          </option>
        </select>
        <input
          onChange={handleInputValues}
          type="number"
          name="phone"
          value={inputValues.phone}
          placeholder="Enter Phone No."
        ></input>
        <input
          onChange={handleInputValues}
          type="email"
          name="email"
          value={inputValues.email}
          placeholder="Enter Email"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Education</td>
            <td>Skills</td>
            <td>Gender</td>
            <td>Phone No.</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {reverseData.map((e, i) => {
            return (
              <tr>
                <td>{e.name}</td>
                <td>{e.education}</td>
                <td>{e.skills}</td>
                <td>{e.gender}</td>
                <td>{e.phone}</td>
                <td>{e.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
