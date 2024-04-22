import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel("Product") readonly productModel: Model<ProductDocument>){}

    async create(name: string, price: number, description: string): Promise<ProductDocument>{
        const newProduct = new this.productModel({name, price, description});
        const product = await newProduct.save();
        return product;
    }

    async findAll(): Promise<ProductDocument[]>{
        const data = await this.productModel.find();
        return data;
    }

    async findOne(id: string){
        const data = await this.productModel.findOne({_id: id});
        return data;
    }

    async editById(id: string, updatedName: string, updatedPrice: number, updatedDescription: string){
        const newData = await this.productModel.findOne({_id: id});
        if(!newData){
            throw new NotFoundException("Error editing product");
        }
        newData.name = updatedName ?? newData.name;
        newData.price = updatedPrice ?? newData.price;
        newData.description = updatedDescription ?? newData.description;
        return newData.save();
    }

    async deleteById(id: string){
        const data = await this.productModel.findOne({_id: id});
        if(!data){
            throw new NotFoundException("Error deleting product")
        }
        return this.productModel.deleteOne({_id: id});
    }
}
