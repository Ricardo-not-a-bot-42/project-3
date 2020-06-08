# project-3

## Views 

### Homeview
-Navbar
-Header 
-- Title
--Description

-Steps
--We
---Cook
---Freeze
--You
---Heat
---Eat

-Freezer
--Featured
---1
---2
---3
---4
--View More

-Footer
--Info
---Logo
---Short description

--About
---Ricardo Loureiro
---Leonor Ferreira

--Contact
---Mails

--Links
---Github Repo
---Linked in profiles

### Freezer

#### Components
-Navbar 
--Media: Logo
--Links: Join / Login
--Links: Profile / Shopping Cart

-Search Bar
--Form

-Category Filter
--UL: Media: Categories

--List
---Popular
---Recommended
---All Meals

--Meal Component
---Media
---Body
----Name
----Ingredients
----Promotion / Price
----Rating

### Meal View

--Media
--Meal Name
--Description
--Meal Size - Wishlist
--Ingredients
--Ingredient edit - Wishlist
--Quantity
--Price
--Add to order - USER
--Edit Meal - ADMIN
--Delete Meal - ADMIN

### Add Meal - ADMIN

--Media
--Meal Name
--Description
--Ingredients
--Price
--Add to freezer

### Shopping Cart

--UL:
---Media
---Body
----Name
----Price
----Quantity

--Total Component
--- Number of meals 
---Discounts - Wishlist
---Total price before / after discount

--Checkout

### Checkout

--Address
--Delivery Date
--Timeslots - Wishlist
--Credit card info

--Complete order

### Successful Order

--Thank you for the order
--Address / Delivery date
--Order ID

--Link : Homeview

### Join

--Form
---Name
---Email
---Address
---Payment Method - Wishlist
---Password


### Login

--Form
---Email
---Password

### Profile - Main

--Name
--Email
--Address

-Button : Edit Profile
-Button : Past orders
-Button : Logout

### Profile - Edit

--Form
---Name
---Email
---Address
---Payment Method - Wishlist

### Profile - Past orders - Wishlist

--UL
---Meal number
---Total price
---Address Delivered
---Date ordered

### Error

--Error Message

--Button : Homeview


## Models

### Users

-Name - String
-Email - String
-Address - String
-PasswordHashAndSalt - String
-CreditCardToken - String - Wishlist

### Meals

--Name - String
--PhotoUrl - String
--Description - String
--Ingredients - Array
--Category - String Enum []
--Price - Object {amount: Number, currency: String}


### Orders

--Meals - Array [Object {id, quantity}]
--Total Price
--Address
--Delivery Date
--Payment
--User - ObjectID
--Timestamp

## API

-POST : '/authentication/login'
-POST : '/authentication/join'
-POST : '/authentication/user-edit'
-POST : '/authentication/logout'
-GET : '/authentication/me'

-POST : '/meal/create'
-POST : '/meal/edit'
-GET : '/meal/list'
-GET : '/meal/:id'

-POST : '/order'
-GET : '/order/list' - Wishlist
