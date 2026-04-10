import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  Teacher,
  Course,
  AcademicTerm,
  ClassGroup,
  Enrollment,
  Grade,
  PagedResponse
} from '../../types/entities.types.ts';
import { baseQuery } from './baseQuery.ts';

export const academicService = createApi({
  reducerPath: 'academicService',
  baseQuery,
  endpoints: builder => ({
    // Teachers
    getTeachers: builder.query<PagedResponse<Teacher>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/teacher?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createTeacher: builder.mutation<Teacher, Omit<Teacher, 'id'>>({
      query: body => ({ url: '/teacher', method: 'POST', body }),
    }),

    // Courses
    getCourses: builder.query<PagedResponse<Course>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/course?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createCourse: builder.mutation<Course, Omit<Course, 'id'>>({
      query: body => ({ url: '/course', method: 'POST', body }),
    }),

    // Academic Terms
    getAcademicTerms: builder.query<PagedResponse<AcademicTerm>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/academic-term?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createAcademicTerm: builder.mutation<AcademicTerm, Omit<AcademicTerm, 'id'>>({
      query: body => ({ url: '/academic-term', method: 'POST', body }),
    }),

    // Class Groups
    getClassGroups: builder.query<PagedResponse<ClassGroup>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/class-group?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createClassGroup: builder.mutation<ClassGroup, Omit<ClassGroup, 'id'>>({
      query: body => ({ url: '/class-group', method: 'POST', body }),
    }),

    // Enrollments
    getEnrollments: builder.query<PagedResponse<Enrollment>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/enrollment?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createEnrollment: builder.mutation<Enrollment, Omit<Enrollment, 'id'>>({
      query: body => ({ url: '/enrollment', method: 'POST', body }),
    }),

    // Grades
    getGrades: builder.query<PagedResponse<Grade>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/grade?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createGrade: builder.mutation<Grade, Omit<Grade, 'id'>>({
      query: body => ({ url: '/grade', method: 'POST', body }),
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useGetCoursesQuery,
  useCreateCourseMutation,
  useGetAcademicTermsQuery,
  useCreateAcademicTermMutation,
  useGetClassGroupsQuery,
  useCreateClassGroupMutation,
  useGetEnrollmentsQuery,
  useCreateEnrollmentMutation,
  useGetGradesQuery,
  useCreateGradeMutation
} = academicService;
