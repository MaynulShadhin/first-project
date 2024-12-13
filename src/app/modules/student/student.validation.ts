import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required.') // Ensures the name is not empty
    .max(20, 'First name cannot be more than 20 characters.'), // Limits the length
  middleName: z.string().optional(), // Optional field
  lastName: z.string().min(1, 'Last name is required.'), // Ensures it's not empty
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."), // Field is required
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z
    .string()
    .regex(/^\d+$/, "Father's contact number must be numeric."), // Must be numbers only
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z
    .string()
    .regex(/^\d+$/, "Mother's contact number must be numeric."),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.'),
  occupation: z.string().min(1, 'Local guardian occupation is required.'),
  contactNo: z
    .string()
    .regex(/^\d+$/, 'Local guardian contact number must be numeric.'),
  address: z.string().min(1, 'Local guardian address is required.'),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema, // Reuse the UserName schema
      gender: z.enum(['female', 'male', 'other']),
      dateOfBirth: z.string().optional(), // Optional field
      email: z.string().email('Email must be a valid email address.'), // Validates proper email format
      contactNo: z.string().regex(/^\d+$/, 'Contact number must be numeric.'),
      emergencyContactNo: z
        .string()
        .regex(/^\d+$/, 'Emergency contact number must be numeric.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(), // Only allows specific blood groups
      presentAddress: z.string().min(1, 'Present address is required.'),
      permanentAddress: z.string().min(1, 'Permanent address is required.'),
      guardian: guardianValidationSchema, // Reuse the Guardian schema
      localGuardian: localGuardianValidationSchema, // Reuse the LocalGuardian schema
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z
        .string()
        .url('Profile image must be a valid URL.')
        .optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
