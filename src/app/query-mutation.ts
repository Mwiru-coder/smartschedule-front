import { gql } from 'apollo-angular';

// Login Mutation=================================================
export const LOGIN_MUTATION = gql`
  mutation CustomLogin($registrationNo: String!, $password: String!) {
    customObtainJsonWebToken(registrationNo: $registrationNo, password: $password) {
      token
      user {
        registrationNo
        firstName
        lastName
        email
      }
    }
  }
`;


 

// Create User Mutation=================================================
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $registrationNo: String!
    $firstName: String!
    $lastName: String!
    $secondName: String!
    $phoneNo: String!
    $email: String!
    $password: String!
    $departmentId: ID!
    $courseCodes: [ID!]!
  ) {
    createUser(
      registrationNo: $registrationNo
      firstName: $firstName
      lastName: $lastName
      secondName: $secondName
      phoneNo: $phoneNo
      email: $email
      password: $password
      departmentId: $departmentId
      courseCodes: $courseCodes
    ) {
      user {
        registrationNo
        firstName
        lastName
        secondName
        email
        phoneNo
        departmentId {
          departmentId
          departmentName
        }
        courseCode {
          courseCode
          courseName
        }
      }
    }
  }
`;



// Update User Mutation=================================================
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $registrationNo: String!
    $firstName: String!
    $phoneNo: String!
    $departmentId: ID!
    $courseCodes: [ID!]!
  ) {
    updateUser(
      registrationNo: $registrationNo
      firstName: $firstName
      phoneNo: $phoneNo
      departmentId: $departmentId
      courseCodes: $courseCodes
    ) {
      user {
        registrationNo
        firstName
        phoneNo
      }
      success
      message
    }
  }
`;



// Delete User Mutation=================================================
export const DELETE_USER_MUTATION = gql`
  mutation {
    deleteUser(registrationNo: $registrationNo) {
      success
      message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      success
      message
    }
  }
`;


// export const GET_USER_QUERY = gql`
//   query GetUser($registrationNo: String!) {
//     user(registrationNo: $registrationNo) {
//       registrationNo
//       firstName
//       lastName
//       secondName
//       email
//       phoneNo
//       departmentId {
//         departmentId
//         departmentName
//       }
//       courseCode {
//         courseCode
//         courseName
//       }
//     }
//   }
// `;



// Venue Mutations=================================================
export const ADD_VENUE_MUTATION = gql`
  mutation AddVenue($venueName: String!, $venueNumber: String!, $capacity: Int!) {
    addVenue(
      venueName: $venueName
      venueNumber: $venueNumber
      capacity: $capacity
    ) {
      success
      message
    }
  }
`;


// Update Venue Mutation=================================================
export const UPDATE_VENUE_MUTATION = gql`
  mutation UpdateVenue($venueName: String!, $venueNumber: String!, $capacity: Int!) {
    updateVenue(
      venueName: $venueName
      venueNumber: $venueNumber
      capacity: $capacity
    ) {
      success
      message
    }
  }
`;

// Delete Venue Mutation==============================================================
export const DELETE_VENUE_MUTATION = gql`
  mutation DeleteVenue($venueNumber: String!) {
    deleteVenue(venueNumber: $venueNumber) {
      success
      message
    }
  }
`;


// Get All Venues Query=======================================================================
export const GET_ALL_VENUES_QUERY = gql`
  query GetAllVenues {
    venue {
      venueName
      venueNumber
      capacity
    }
  }
`;


// Get Venue By Number Query=======================================================================
export const GET_VENUE_BY_NUMBER_QUERY = gql`
  query GetVenueByNumber($venueNumber: String!) {
    venueNumber(venueNumber: $venueNumber) {
      venueName
      venueNumber
      capacity
    }
  }
`;



// Add Program Mutation====================================================================
export const ADD_PROGRAM_MUTATION = gql`
  mutation AddProgram(
    $programName: String!
    $programCode: String!
    $duration: String!
    $departmentId: ID!
  ) {
    addProgram(
      programName: $programName
      programCode: $programCode
      duration: $duration
      departmentId: $departmentId
    ) {
      success
      message
    }
  }
`;

// Update Program Mutation=================================================================
export const UPDATE_PROGRAM_MUTATION = gql`
  mutation UpdateProgram(
    $programCode: String!
    $programName: String!
    $duration: String!
    $departmentId: ID!
  ) {
    updateProgram(
      programCode: $programCode
      programName: $programName
      duration: $duration
      departmentId: $departmentId
    ) {
      success
      message
    }
  }
`;

// Delete Program Mutation===========================================================================
export const DELETE_PROGRAM_MUTATION = gql`
  mutation DeleteProgram($programCode: String!) {
    deleteProgram(programCode: $programCode) {
      success
      message
    }
  }
`;
// Get All Programs Query=======================================================================
export const GET_ALL_PROGRAMS_QUERY = gql`
  query GetAllPrograms {
    program {
      programName
      programCode
      duration
      departmentId {
        departmentId
        departmentName
      }
    }
  }
`;
// Get Program By Code Query=======================================================================
export const GET_PROGRAM_BY_CODE_QUERY = gql`
  query GetProgramByCode($programCode: String!) {
    programCode(programCode: $programCode) {
      programName
      programCode
      duration
      departmentId {
        departmentId
        departmentName
      }
    }
  }
`;

export const ADD_COURSE_MUTATION = gql`
  mutation AddCourse(
    $courseName: String!
    $courseCode: String!
    $courseCredit: Int!
    $programCode: String!
  ) {
    addCourse(
      courseName: $courseName
      courseCode: $courseCode
      courseCredit: $courseCredit
      programCode: $programCode
    ) {
      success
      message
    }
  }
`;

// Update Course Mutation
export const UPDATE_COURSE_MUTATION = gql`
  mutation UpdateCourse(
    $courseName: String!
    $courseCode: String!
    $courseCredit: Int!
    $programCode: String!
  ) {
    updateCourse(
      courseName: $courseName
      courseCode: $courseCode
      courseCredit: $courseCredit
      programCode: $programCode
    ) {
      success
      message
    }
  }
`;

// Delete Course Mutation
export const DELETE_COURSE_MUTATION = gql`
  mutation DeleteCourse($courseCode: String!) {
    deleteCourse(courseCode: $courseCode) {
      success
      message
    }
  }
`;

// Get All Courses Query=========================================================
export const GET_ALL_COURSES_QUERY = gql`
  query GetAllCourses {
    course {
      courseName
      courseCode
      courseCredit
      programCode {
        programCode
        programName
        duration
        departmentId {
          departmentId
          departmentName
        }
      } 
    }
  }
`;




// Add Group Mutation==========================================================
export const ADD_GROUP_MUTATION = gql`
  mutation AddGroup(
    $groupId: ID!
    $groupName: String!
    $academicYear: String!
    $courseCode: String!
    $programCode: String!
    $studentNo: Int!
    $departmentId: String!
  ) {
    addGroup(
      groupId: $groupId
      groupName: $groupName
      academicYear: $academicYear
      courseCode: $courseCode
      programCode: $programCode
      studentNo: $studentNo
      departmentId: $departmentId
    ) {
      success
      message
    }
  }
`;

// Update Group Mutation===========================================================
export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroup(
    $groupId: ID!
    $groupName: String!
    $academicYear: String!
    $courseCode: String!
    $programCode: String!
    $studentNo: Int!
    $departmentId: String!
  ) {
    updateGroup(
      groupId: $groupId
      groupName: $groupName
      academicYear: $academicYear
      courseCode: $courseCode
      programCode: $programCode
      studentNo: $studentNo
      departmentId: $departmentId
    ) {
      success
      message
    }
  }
`;

// Delete Group Mutation=====
export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId) {
      success
      message
    }
  }
`;
