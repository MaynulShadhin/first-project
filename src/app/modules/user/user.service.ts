import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/studets.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given, use default password

  userData.password = password || (config.default_pass as string);

  //set student role

  userData.role = 'student';

  // id generate
  // year--> semesterCode ---> 4 digit num to generate id

  //find academic semester info
  const admissionSemester: any = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set generated id
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    //set id and _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
