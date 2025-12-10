import Ingredient, { type IIngredient } from '../models/ingredient.model';

export class IngredientDao {
    public static instance: IngredientDao;

    static getInstance = (): IngredientDao => {
        if (!this.instance) {
            this.instance = new IngredientDao();
        }
        return this.instance;
    };
    public async createIngredient(ingredientData: Partial<IIngredient>) {
            try {
                const ingredient = new Ingredient(ingredientData);
                return await ingredient.save();
            } catch (error) {
               throw error;
            }
    }
    public async getAllIngredient(){
            try {
                return await Ingredient.find();
            } catch(error){
                throw error;
            }
    }
    public async getIngredientById(id:String){
        try{
            return await Ingredient.findById(id);
        } catch(error){
            throw error;
        }
        }
    public async updateIngredient(id:String,ingredientData: Partial<IIngredient>  ){
        try{
            return await Ingredient.findByIdAndUpdate(id,ingredientData);
        } catch(error){
            throw error;
        }
        }
    public async deleteIngredient(id:String ){
        try{
            return await Ingredient.findByIdAndDelete(id);
        } catch(error){
            throw error;
        }
        }
    
    }
    
    

