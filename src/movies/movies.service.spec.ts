import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SIGHUP } from 'constants';
import { privateEncrypt } from 'crypto';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () =>{
    it("should return an array",()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne",()=>{
    it('should return a movie', ()=>{
      service.create({
        title:"Test Movie",
        year:2021,
        genres:["test"],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () =>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });


  describe("deleteOne", ()=>{
    it("deletes a movie", () =>{
      service.create({
        title:"Test Movie",
        year:2021,
        genres:["test"],
      });
      const am = service.getAll();
      service.deleteOne(1);
      const ad = service.getAll();
      expect(ad.length).toBeLessThan(am.length);
    });
    it("it sould return 404 error", () =>{
      try{
        service.deleteOne(9999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });



  describe("create",()=>{
    it("should create a movie", ()=>{
      const bc= service.getAll().length;
      service.create({
        title:"Test Movie",
        year:2021,
        genres:["test"],
      });
      const ac = service.getAll().length;
      expect(ac).toBeGreaterThan(bc);
    });
  });


  describe("update", () =>{
    it("should update a movie", () =>{
      service.create({
        title: 'test Movie',
        genres: ['test'],
        year:2000,
      });
      service.update(1,{
        year:3000,
      });
      const tmp = service.getOne(1);
      expect(tmp.year).toEqual(3000);
    });
    it("it should update a 404", () =>{
      try{
        service.update(999,{year:1000});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });
});
