import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch(error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El Pokemon existe en la db ${ JSON.stringify(error.keyValue) }`);
      }
      throw new InternalServerErrorException(`No se puede crear un pokemon - revise el log`);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(id: string) {
    let pokemon: Pokemon | null = null;

    const noNumber = +id;
    if ( !isNaN(noNumber) ) {
      pokemon = await this.pokemonModel.findOne({ no: noNumber });
      if (pokemon) return pokemon;
    }

    if ( isValidObjectId(id) ) {
      pokemon = await this.pokemonModel.findById(id);
      if (pokemon) return pokemon;
    }

    pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase().trim() });

    if (!pokemon)
      throw new NotFoundException(`El pokemon con id, nombre o no "${ id }" no fue encontrado`);

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    await pokemon.updateOne(updatePokemonDto);
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne();
    return { message: `Pokemon eliminado` };
  }
}