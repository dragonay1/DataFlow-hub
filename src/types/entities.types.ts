export interface BaseEntity {
  id: string;
}

export interface Student extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  studentCode: string;
  dateOfBirth: string;
  address: string;
}

export interface Teacher extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  employeeNumber: string;
  specialization: string;
  title: string;
}

export interface Course extends BaseEntity {
  name: string;
  code: string;
  credits: number;
  description: string;
}

export interface AcademicTerm extends BaseEntity {
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ClassGroup extends BaseEntity {
  name: string;
  maxCapacity: number;
  courseId: string;
  teacherId: string;
  academicTermId: string;
}

export interface Enrollment extends BaseEntity {
  studentId: string;
  classGroupId: string;
}

export interface Grade extends BaseEntity {
  enrollmentId: string;
  assessmentName: string;
  score: number;
  weightPercentage: number;
}

export interface PagedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}
