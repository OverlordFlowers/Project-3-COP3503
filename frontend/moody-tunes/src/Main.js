import React from "react";
import { Button } from "react-bootstrap";
import Banner from "./Banner";
import Footer from "./Footer";


function Main(props) {
  return (
    <div className="large-container">
      <Banner />
      <div className="header-text">What is YANTRA?</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px -20px",
        }}
      >
        <div className="content-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Adaptable Quizzes
          </span>
          <div className="content-text">
          With a system designed to make flipped classrooms more effective, 
          adaptable quizzes allow each student to have a personalized experience 
          that is tailored to their unique potential. Instructors ensure that every 
          student reaches a minimum level of understanding of the concepts before 
          the class and students are encouraged to develop their mastery in the course content.
          </div>
        </div>
        <div className="content-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Insights
          </span>
          <div className="content-text">
            With robust algorithms powering YANTRA, students and instructors 
            are able to gather more insights about their performance 
            while also working on areas which need improvement. These 
            algorithms puts the power back into the student's hands to 
            control their learning before the class while the instructor 
            focusses on making in-class engagement more effective and 
            valuable to students’ learning.
          </div>
        </div>
        <div className="content-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Intuitive
          </span>
          <div className="content-text">
            Designed by educational-researchers, YANTRA can be 
            easily integrated with an LMS like Canvas. With an 
            easy setup process, YANTRA will be able to empower 
            flipped classes with a pedagogy that helps in better 
            learning management for the students and the instructor. 
            With its intuitive user-design, instructors are able 
            engage with YANTRA and harness its capabilities seamlessly. 
          </div>
        </div>
      </div>
      <div className="header-text" style={{ marginTop: "40px" }}>
        Interested?
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px -20px",
        }}
      >
        <div className="learn-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            For Students
          </span>
          <div className="content-text">
            Prepare for the in-class activities for a flipped class and 
            improve your learning outcomes by engaging in adaptive quizzing experience.
          </div>
          <div
            style={{
              display: "block",
              position: "absolute",
              bottom: "30px",
              width: `calc(100% - 75px)`,
            }}
          >
            <Button
              className="btn btn-main"
              style={{ margin: "0 auto" }}
              onClick={() => {
                props.history.push(`/student`);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="learn-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            For Instructors
          </span>
          <div className="content-text">
            YANTRA is a whole new insight and analysis tool for flipped classes that 
            is able to help your students to be prepared before they come to the 
            class and assist you to design the most valuable in-class learning 
            experience for your students.  
          </div>
          <div
            style={{
              display: "block",
              position: "absolute",
              bottom: "30px",
              width: `calc(100% - 75px)`,
            }}
          >
            <Button
              className="btn btn-main"
              style={{ margin: "0 auto" }}
              onClick={() => {
                props.history.push(`/instructor`);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
