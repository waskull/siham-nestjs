import { Controller, Get, Param, Patch, Delete, Post, Body, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CompanyService } from './company.service';
import { createCompanyDto } from './dtos';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService,
    ){}
    @Get()
    async getAll(){
        return await this.companyService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.companyService.getOne(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.COMPANY
        }
    )
    @Post()
    async create(@Body() dto: createCompanyDto){
        await this.companyService.findOneByName(dto.name);
        const client = this.companyService.create(dto);
        return {message:"Compañia creada"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.COMPANY
        }
    )
    @Patch(':id')
    async edit(@Param('id', ParseIntPipe) id: number, @Body() dto: createCompanyDto){
        const company = await this.companyService.getOneByName(dto.name);
        console.log(company);
        if(company) {if(id !== company.id && company.name === dto.name) throw new BadRequestException("El nombre de esa compañia ya ha sido registrado")}
        await this.companyService.edit(id,dto);
        return {message:"Compañia editada"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.COMPANY
        }
    )
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        await this.companyService.delete(id);
        return {message:"Compañia eliminada"}
    }
}
