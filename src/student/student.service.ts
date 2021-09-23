import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import { FindTeacherResponseDto } from 'src/teacher/dto/teacher.dto';
import { v4 as uuid } from 'uuid';
import {
  CreateStudentsDto,
  FindStudentsResponseDto,
  StudentsResponseDto,
  UpdateStudetsDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  private students = students;

  getStudents(): FindStudentsResponseDto[] {
    return this.students;
  }

  getStudentbyId(studentId: string): FindStudentsResponseDto {
    return this.students.find((student) => {
      return student.id === studentId;
    });
  }

  creatStudent(payload: CreateStudentsDto): StudentsResponseDto {
    let newStudent = {
      id: uuid(),
      ...payload,
    };
    this.students.push(newStudent);

    return newStudent;
  }

  updateStudent(payload: UpdateStudetsDto, studentId: string) {
    let updatedStudent: StudentsResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updatedStudent = {
          id: studentId,
          ...payload,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }

  getStudentsByTeacher(teacherId: string): FindStudentsResponseDto[] {
    return this.students.filter((student) => {
      return student.teacher === teacherId;
    });
  }

  updateStudentTeacher(
    teacherId: string,
    studentId: string,
  ): StudentsResponseDto {
    let updatedStudent: StudentsResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updatedStudent = {
          ...student,
          teacher: teacherId,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
}
