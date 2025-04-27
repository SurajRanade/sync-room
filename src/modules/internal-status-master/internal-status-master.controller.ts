import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternalStatusMasterService } from './internal-status-master.service';
import { CreateInternalStatusMasterDto } from './dto/create-internal-status-master.dto';
import { UpdateInternalStatusMasterDto } from './dto/update-internal-status-master.dto';

@Controller('internal-status-master')
export class InternalStatusMasterController {
  constructor(private readonly internalStatusMasterService: InternalStatusMasterService) {}

  @Post()
  create(@Body() createInternalStatusMasterDto: CreateInternalStatusMasterDto) {
    return this.internalStatusMasterService.create(createInternalStatusMasterDto);
  }

  @Get()
  findAll() {
    return this.internalStatusMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internalStatusMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternalStatusMasterDto: UpdateInternalStatusMasterDto) {
    return this.internalStatusMasterService.update(+id, updateInternalStatusMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internalStatusMasterService.remove(+id);
  }
}
