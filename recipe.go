package main

import "gopkg.in/mgo.v2/bson"

type Recipe struct {
	Id           bson.ObjectId       `bson:"_id" json:"_id"`
	Created      int64               `bson:"created" json:"created"`
	Version      int64               `bson:"version" json:"version"`
	Title        string              `bson:"name" json:"name"`
	Categories   []string            `bson:"categories" json:"categories"`
	Yield        int64               `bson:"yield", json:"yield"`
	Ingredients  []IngredientSection `bson:"ingredients" json:"ingredients"`
	Instructions string              `bson:"instructions" json:"instructions"`
	About        string              `bson:"about" json:"about"`
}

type IngredientSection struct {
	Section     string       `bson:"section" json:"section"`
	Ingredients []Ingredient `bson:"ingredients" json:"ingredients"`
}

type Ingredient struct {
	Qty    string `bson:"qty" json:"qty"`
	Unit   string `bson:"unit" json:"unit"`
	Name   string `bson:"name" json:"name"`
	Detail string `bson:"detail" json:"detail"`
}
