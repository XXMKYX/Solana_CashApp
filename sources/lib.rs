use anchor_lang::prelude::*; //Importando libreria de anchor (contiene Contex,Box,Account,etc) :: es para entrar como el cd, * all
pub mod states;
pub mod constant;
use crate::{constant::*, states::*}; //Toma todo el contenido del archivo states.rs
// This is your program's public key and it will update
declare_id!("HL9wyyDXk7L1G5tmev4ogD1rMViDikGDr96qyQZVjUg8");

//Creacion de PDA (Profile Derived Account) para crear cuentas desde solana program 
#[program] //Macro que define el program
pub mod smart_shop{
    use super::*; //Toma todas las instrucciones del scope principal (linea 1 - 8)
    //User account con default data
    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()>{ //Funcion publica, ctx = creacion de contexto, : = tipo de dato contexto
        let user_profile = &mut ctx.accounts.user_profile; //&mut mutable
        user_profile.authority = ctx.accounts.authority.key(); //El authority llama con la key el account
        user_profile.last_item = 0;
        user_profile.item_count = 0;
        Ok(()) //Ejecuta la logica al finalizar la funcion, si se le agrega un parametro se puede usar como Return
    }
    pub fn add_item(
        //Parametros
        ctx: Context<AddItem>,
        location: String,
        country: String,
        price: String,
        img: String,
    ) -> Result<()>{
        //Inicializando contador de items
        let item_account = &mut ctx.accounts.item_account;
        let user_profile = &mut ctx.accounts.user_profile;

        item_account.authority = ctx.accounts.authority.key(); //Solo colocando el obj sirve como console.log
        item_account.idx = user_profile.last_item;
        item_account.location = location;
        item_account.country = country;
        item_account.price = price;
        item_account.img = img;
        item_account.isReserved = false;
        //Se debe incrementar el index del PDA para que cambie a la sig posicion y no se quede en cero
        user_profile.last_item = user_profile.last_item //El ; marcaria EndLine asi que no se pone
        .checked_add(1) //Aumenta el item en uno
        .unwrap();

        user_profile.item_count = user_profile.item_count //Si tenemos cero items
        .checked_add(1) //Aumenta el item en uno
        .unwrap();

        Ok(())
    }
    //Update item
    pub fn update_item(
        ctx: Context<UpdateItem>, //El contexto va a update item
        _item_idx: u8,//_ No pasa el parametro
        location: String,
        country: String,
        price: String,
        img: String,
    ) -> Result<()>{
        //Traemos la Estructura para el update
        let item_account = &mut ctx.accounts.item_account;

        item_account.location = location;
        item_account.country = country;
        item_account.price = price;
        item_account.img = img;

        Ok(())
    }
    //Remove item
    pub fn remove_item(ctx: Context<RemoveItem>,_item_idx:u8)->Result<()>{
        //Decremento del contador de items
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.item_count = user_profile.item_count //El ; marcaria EndLine asi que no se pone
        .checked_sub(1) //Decrementa el item en uno
        .unwrap();

        Ok(())
    }

    //La info del front pasa por esta funcion y crea una nueva marca de booking account
    pub fn book_item(
        ctx: Context<BookItem>,
        idx: u8,
        date: String,
        location: String,
        country: String,
        price: String,
        img: String,
    ) -> Result<()>{
        let booking_account = &mut ctx.accounts.booking_account;
        booking_account.authority = ctx.accounts.authority.key();//Especificando la autoridad para que no tome el default 1111..
        booking_account.idx = idx;
        booking_account.date = date;
        booking_account.location = location;
        booking_account.country = country;
        booking_account.price = price;
        booking_account.img = img;
        booking_account.isReserved = true;

        Ok(())
    }

    pub fn cancel_booking(ctx: Context<CancelBook>,_booking_idx:u8) -> Result<()>{
        //Todo lo hace el Conexto CancelBook
        Ok(())
    }
}

//Estructura del Context - PDA
#[derive(Accounts)]
pub struct InitializeUser<'info>{
    #[account(mut)] //Todo lo que este debajo de esta macro sera mutable
    pub authority: Signer<'info>, //El usuario que firma la transaccion
    #[account(
        init, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump, 
        payer = authority,
        space = 32 + 1 + 1 + 8,
    )] 
    /*init: Anchor inicializa una cuenta automaticamente, 
    seeds: unico hash para el PDA, 
    payer: quien va a pagar por la txn
    space: authority(string) = 32 + last_item = 1 + item_count = 1 + 8 Anchor*/
    pub user_profile: Box<Account<'info, UserProfile>>,
    pub system_program: Program<'info,System>,
}
//Estructira para Agregar Items
#[derive(Accounts)]
#[instruction()]
pub struct AddItem<'info>{
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump, 
        has_one = authority,
    )]
    //mut: para que podamos agregar diferentes items
    //has_one: solo tiene un dueño que podra controlar su item
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(
        init, 
        seeds = [ITEM_TAG, authority.key().as_ref(),&[user_profile.last_item]],
        bump,
        payer = authority,
        space = 2865 + 8,
    )]
    pub item_account: Box<Account<'info, ItemAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info,System>, 
}
//Estructura para update
#[derive(Accounts)]
#[instruction(item_idx:u8)]
pub struct UpdateItem<'info>{
    //Entra por el teclado
    #[account(
        mut, 
        seeds = [ITEM_TAG, authority.key().as_ref(),&[item_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub item_account: Box<Account<'info,ItemAccount>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info,System>, 
}
//Estructura para remove
#[derive(Accounts)]
#[instruction(item_idx:u8)]
pub struct RemoveItem<'info>{
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut, 
        close = authority,
        seeds = [ITEM_TAG, authority.key().as_ref(),&[item_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    //Close: Sierra la cuenta por lo que se "remueve"
    pub item_account: Box<Account<'info,ItemAccount>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info,System>, 
}
//Booking
#[derive(Accounts)]
#[instruction()]
pub struct BookItem<'info>{
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
    //Book account
    #[account(
        init, 
        seeds = [BOOK_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 3125 + 8,
    )]
    pub booking_account: Box<Account<'info, BookingAccount>>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info,System>, 
}

//unBooking
#[derive(Accounts)]
pub struct CancelBook<'info>{
    #[account(
        mut, 
        close = authority,
        seeds = [BOOK_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub booking_account: Box<Account<'info, BookingAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info,System>, 
}