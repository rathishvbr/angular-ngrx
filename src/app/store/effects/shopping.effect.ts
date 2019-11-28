import { ShoppingService } from './../../shopping.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadShoppingAction, LoadShoppingSuccessAction, ShoppingActionTypes, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemFailureAction, DeleteItemSuccessAction } from './../actions/shopping.actions';
import { Injectable } from '@angular/core';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class ShoppingEffects {
    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItems()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data)),
                        catchError(error => of(new LoadShoppingFailureAction(error)))
                    )
            )
        )

    @Effect() addShoppingItem$ = this.actions$
        .pipe(
            ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
            mergeMap(
                data => this.shoppingService.addShoppingItem(data.payload)
                    .pipe(
                        map(() => new AddItemSuccessAction(data.payload)),
                        catchError(error => of(new AddItemFailureAction(error)))
                    )
            )
        )

    @Effect() deleteShoppingItem$ = this.actions$
        .pipe(
            ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
            mergeMap(
                data => this.shoppingService.deleteShoppingItem(data.payload)
                    .pipe(
                        map(() => new DeleteItemSuccessAction(data.payload)),
                        catchError(error => of(new DeleteItemFailureAction(error)))
                    )
            )
        )

    constructor(private actions$: Actions, private shoppingService: ShoppingService) {

    }
}