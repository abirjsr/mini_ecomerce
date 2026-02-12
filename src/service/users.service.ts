import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../entity/user.entity';
import {Role} from '../enum/role.enum';
@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}
    async create(userData:Partial<User> ):Promise<User>{
             const user=this.usersRepository.create(userData);
             return this.usersRepository.save(user);
    }


    async findbyEmail(email:string):Promise<User |null >{
        return this.usersRepository.findOne({where:{email}});

    }

    async findbyId(id:string):Promise<User |null>{
        return this.usersRepository.findOne({where:{id}});
    }

    async incrementCancelledOrders(userId:string):Promise<void>{
    
        const user= await this.findbyId(userId);
        if(user){
            user.cancelledOrdersCount +=1;
            if(user.cancelledOrdersCount >=7){
                user.isSuspended=true;
            }
            await this.usersRepository.save(user);
    }

    }

}