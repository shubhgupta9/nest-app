import { Controller, Get, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import {
  FindStudentsResponseDto,
  StudentsResponseDto,
} from '../student/dto/student.dto';

@Controller('teachers/teacherId/students')
export class StudentTeacherController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  getStudents(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindStudentsResponseDto[] {
    return this.studentService.getStudentsByTeacher(teacherId);
  }

  @Put('/:studentId')
  updateStudentTeacher(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): StudentsResponseDto {
    return this.studentService.updateStudentTeacher(teacherId, studentId);
  }
}
