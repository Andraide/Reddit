import { BehaviorSubject } from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage'
const permissions = new BehaviorSubject({})

export const permissionService = {
    setPermission,
    permissionSubscribe: permissions.asObservable(),
    get permissions() { return permissions.value }
}

async function setPermission(permission, value) 
{
    var persistentValues = await AsyncStorage.getItem('permissions')
    persistentValues = JSON.parse(persistentValues)
    let x = persistentValues ? persistentValues : {}
    x[permission] = value
    console.log("X", x)
    await AsyncStorage.setItem('permissions', JSON.stringify(x))
    permissions.next(x)
}