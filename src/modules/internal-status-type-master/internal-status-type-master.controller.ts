import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternalStatusTypeMasterService } from './internal-status-type-master.service';
import { CreateInternalStatusTypeMasterDto } from './dto/create-internal-status-type-master.dto';
import { UpdateInternalStatusTypeMasterDto } from './dto/update-internal-status-type-master.dto';

@Controller('internal-status-type-master')
export class InternalStatusTypeMasterController {
  constructor(private readonly internalStatusTypeMasterService: InternalStatusTypeMasterService) {}

  @Post()
  create(@Body() createInternalStatusTypeMasterDto: CreateInternalStatusTypeMasterDto) {
    return this.internalStatusTypeMasterService.create(createInternalStatusTypeMasterDto);
  }

  @Get()
  findAll() {
    return this.internalStatusTypeMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internalStatusTypeMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternalStatusTypeMasterDto: UpdateInternalStatusTypeMasterDto) {
    return this.internalStatusTypeMasterService.update(+id, updateInternalStatusTypeMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internalStatusTypeMasterService.remove(+id);
  }
}
