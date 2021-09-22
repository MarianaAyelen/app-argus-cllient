
import AsyncStorage from '@react-native-async-storage/async-storage';



class UserStorage {
    keyStorage = "userStorage";


    save = async (value) => {
        let usertoken = {
            token: value
        }
        const jsonValue = JSON.stringify(usertoken)

        try {
            await  AsyncStorage.setItem(this.keyStorage, jsonValue);
        } catch (e) {
            alert("Ha ocurrido un error inesperado")
        }
    }



    get = async () => {
        try {
            value = await AsyncStorage.getItem(this.keyStorage);
            if(value != null) {
                return JSON.parse(value);
            }
        } catch(e) {
            alert("Ha ocurrido un error inesperado")
        }
    }

    remove = async() => {
        await AsyncStorage.setItem(this.keyStorage, "")
    }

}

export const userStorage = new UserStorage();