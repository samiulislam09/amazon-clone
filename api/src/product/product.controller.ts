import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createproduct.dto';
import { UpdateUserDto } from './dto/editUser.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  createProduct(@Body() body: CreateProductDto){
    return this.productService.create(body.name, body.price, body.description);
  }

  @Get()
  getAllProduct(){
    return this.productService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id:string){
    return this.productService.findOne(id);
  }

  @Patch('/:id')
  editById(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
    return this.productService.editById(id, updateUserDto.name, updateUserDto.price, updateUserDto.description);
  }

  @Delete('/:id')
  deleteById(@Param('id') id:string){
    return this.productService.deleteById(id);
  }


}
