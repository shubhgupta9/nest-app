import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  CreateStudentsDto,
  FindStudentsResponseDto,
  StudentsResponseDto,
  UpdateStudetsDto,
} from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(): FindStudentsResponseDto[] {
    return this.studentService.getStudents();
  }

  @Get('/:studentId')
  getStudentById(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): FindStudentsResponseDto {
    return this.studentService.getStudentbyId(studentId);
  }

  @Post()
  createStudent(@Body() body: CreateStudentsDto): FindStudentsResponseDto {
    return this.studentService.creatStudent(body);
  }

  @Put()
  updateStudent(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Body() body: UpdateStudetsDto,
  ): StudentsResponseDto {
    return this.studentService.updateStudent(body, studentId);
  }
}
