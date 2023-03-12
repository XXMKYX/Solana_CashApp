use anchor_lang::prelude::*; 
//Definicion del contexto para el usuario inicial UserProfile
#[account]
#[derive(Default)]
pub struct UserProfile{
    pub authority: Pubkey, //32
    pub last_item: u8, //1
    pub item_count: u8, //1
}

#[account]
#[derive(Default)]
pub struct ItemAccount{
    pub authority: Pubkey, //32
    pub idx: u8,// 1 track to index
    pub location: String, // 4 + 256(max)
    pub country: String,  // 4 + 256(max)
    pub price: String,  // 4 + 256(max)
    pub img: String, // 4 + 2048(max)
    pub isReserved: bool,
}

#[account]
#[derive(Default)]
pub struct BookingAccount{
    pub authority: Pubkey, //32
    pub date: String,
    pub idx: u8,// 1 track to index
    pub location: String, // 4 + 256(max)
    pub country: String,  // 4 + 256(max)
    pub price: String,  // 4 + 256(max)
    pub img: String, // 4 + 2048(max)
    pub isReserved: bool,
}