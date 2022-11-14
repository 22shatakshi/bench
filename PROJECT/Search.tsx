import { getDocs } from 'firebase/firestore'
import { database } from '../config/firebase'
import { AuthContext } from "../context/AuthContext"
import React, { useContext } from 'react'
import { userAgent } from 'next/server'

const Search = () => {
    const { currentUser } = useContext(AuthContext)

    const handleSelect = async () => {
        // Check whether the pair's chat (chats in Firestore) exists, if not then create one
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid
        const response = await getDocs(database, "chats")
    }
    return (
        <div>

        </div>
    )
}
