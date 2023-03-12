use anchor_lang::prelude::*; 

#[constant]
pub const USER_TAG: &[u8] = b"USER_STATE"; //b = string to be used in the seed
 
#[constant]
pub const ITEM_TAG: &[u8] = b"ITEM_STATE";

#[constant]
pub const BOOK_TAG: &[u8] = b"BOOK_STATE";
