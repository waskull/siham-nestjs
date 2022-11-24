import { RolesBuilder } from 'nest-access-control';

export enum AppRoles{
    GERENTE = 'gerente',
    ADMIN = 'admin',
    VENDEDOR = 'vendedor'
}

export enum AppResource{
    USER = 'USER',
    ITEM = 'ITEM',
    CLIENT = 'CLIENT',
    BILL = 'BILL',
    COMPANY = 'COMPANY',
    INVENTORY = 'INVENTORY',
    ORDER = 'ORDER',
    ROUTE = 'ROUTE',
    SALE = 'SALE'
}
//.extend(AppRoles.GERENTE)
export const roles: RolesBuilder = new RolesBuilder();

roles

.grant(AppRoles.VENDEDOR)
.readAny([AppResource.ITEM,AppResource.INVENTORY, AppResource.BILL, AppResource.ROUTE,AppResource.SALE, AppResource.CLIENT, AppResource.COMPANY])
.readOwn([AppResource.USER])
.create([AppResource.BILL,AppResource.SALE, AppResource.CLIENT])
.updateOwn([AppResource.BILL,AppResource.SALE,AppResource.USER])

.grant(AppRoles.GERENTE)
.readAny([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.create([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.updateAny([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.deleteAny([AppResource.ITEM, AppResource.COMPANY, AppResource.BILL, AppResource.ROUTE,AppResource.SALE,AppResource.ORDER])

.grant(AppRoles.ADMIN)
.readAny([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.createAny([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.updateAny([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])
.deleteAny([AppResource.USER, AppResource.ITEM, AppResource.CLIENT,AppResource.SALE,AppResource.ORDER,AppResource.ROUTE,AppResource.BILL,AppResource.COMPANY, AppResource.INVENTORY])

