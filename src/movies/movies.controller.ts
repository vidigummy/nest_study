import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This This!";
    }

    @Get("/:id")
    getOne(@Param("id") id: string){

        return `this will return one movie ${id}`;
    }

    @Post()
    create(){
        return 'this will create a movie';
    }

    @Delete("/:id")
    remove(@Param("id") id: string){
        return `This will delete a movie ${id}`;
    }

    @Patch('/:id')
    path(@Param('id') id: string){
        return `update movie : ${id}`;
    }
}
