import { createApi } from '@reduxjs/toolkit/query/react';
import type { Student, PagedResponse } from '../../types/entities.types.ts';
import { baseQuery } from './baseQuery.ts';

export const studentService = createApi({
  reducerPath: 'studentService',
  baseQuery,
  endpoints: builder => ({
    getStudents: builder.query<PagedResponse<Student>, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) => `/student?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    createStudent: builder.mutation<Student, Omit<Student, 'id'>>({
      query: body => ({
        url: '/student',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetStudentsQuery, useCreateStudentMutation } = studentService;
