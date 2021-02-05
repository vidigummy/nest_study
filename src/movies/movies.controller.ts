import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This This!";
    }

    @Get('search')
    search(@Query('year') searchingYear : string){
        return `We searching ${searchingYear}`;
    }

    @Get("/:id")
    getOne(@Param("id") id: string){

        return `this will return one movie ${id}`;
    }

    @Post()
    create(@Body() movieData){
        return movieData;
    }

    @Delete("/:id")
    remove(@Param("id") id: string){
        return `This will delete a movie ${id}`;
    }

    @Patch('/:id')
    path(@Param('id') id: string, @Body() movieData){
        return {
            movieData: id,
            ...movieData,
        };
    }


}
