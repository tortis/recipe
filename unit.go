package main

type Unit string

// Represents a measurement unit used in recipes.
type Unit struct {
	// The physical quantity the unit describes
	Type UnitType
	// Name of the unit (eg. Liter)
	Name string
	// Factor to convert to standard metric unit (if quantitative)
	StdConv float64
}

// Physical Quantities
type UnitType uint32

const (
	UnitTypeVolume = iota
	UnitTypeWeight
	UnitTypeSize
	UnitTypeQuantity
)

// Volume Units
var (
	units = make(map[string]*Unit)
)

func init() {
	// Load units from file
	// Units of volume
	units["mililiter"] = units["ml"] = &Unit{UnitTypeVolume, "mililiter", 0.001}
	units["centiliter"] = units["cl"] = &Unit{UnitTypeVolume, "centiliter", 0.01}
	units["deciliter"] = units["dl"] = &Unit{UnitTypeVolume, "deciliter", 0.1}
	units["liter"] = units["l"] = &Unit{UnitTypeVolume, "liter", 1.0}
	units["fluid ounce"] = units["fl"] = &Unit{UnitTypeVolume, "fluid ounce", 0.0295735}
	units["pint"] = units["pt"] = &Unit{UnitTypeVolume, "pint", 0.473176}
	units["quart"] = units["qt"] = &Unit{UnitTypeVolume, "quart", 0.946353}
	units["gallon"] = &Unit{UnitTypeVolume, "gallon", 3.78541}
	units["cup"] = &Unit{UnitTypeVolume, "cup", 0.236588}
	units["tablespoon"] = &Unit{UnitTypeVolume, "tablespoon", 0.0147868}
	units["teaspoon"] = &Unit{UnitTypeVolume, "teaspoon", 0.00492892}
	units["pinch"] = &Unit{UnitTypeVolume, "pinch", 0.000616115}
	units["dash"] = &Unit{UnitTypeVolume, "dash", 0.0003080575}
	units["drop"] = &Unit{UnitTypeVolume, "drop", 0.0000616115}

	// Units of weight
	units["miligram"] = Unit{UnitTypeWeight, "miligram", 0.001}
	units["centigram"] = Unit{UnitTypeWeight, "centigram", 0.01}
	units["decigram"] = Unit{UnitTypeWeight, "decigram", 0.1}
	units["gram"] = Unit{UnitTypeWeight, "gram", 1.0}
	units["kilogram"] = Unit{UnitTypeWeight, "kilogram", 1000.0}
	units["ounce"] = Unit{UnitTypeWeight, "ounce", 28.3495}
	units["pound"] = Unit{UnitTypeWeight, "pound", 0.00220462}

	// Qualitative size
	units["small"] = Unit{UnitTypeSize, "small"}
	units["medium"] = Unit{UnitTypeSize, "medium"}
	units["large"] = Unit{UnitTypeSize, "large"}

	// Named (no units)
	units["can"] = Unit{UnitTypeQuantity, "can"}
	units["package"] = Unit{UnitTypeQuantity, "package"}
	units["slice"] = Unit{UnitTypeQuantity, "slice"}
	units["carton"] = Unit{UnitTypeQuantity, "carton"}
	units["bunch"] = Unit{UnitTypeQuantity, "bunch"}
	units[""] = Unit{UnitTypeQuantity, ""}
}

func GetUnit(name string) *Unit {
	u, exists := units[name]
	if !exists {
		return nil
	}
	return u
}

// Function to convert source quantity from sourceUnit to targetUnit. Will fail if the source and target units
// do not describe the same physical quantity. Will fail if source units are not quantitative.
func ConvertUnits(sourceUnit, targetUnit Unit, source float64) (float64, error) {
	// Check the simple case
	if sourceUnit == targetUnit {
		return source, nil
	}

	// Ensure the units describe the same physical quantity
	t := sourceUnit.Type()
	if t != targetUnit.Type() {
		return -1.0, errors.New("Cannot convert from " + sourceType + " to " + targetType + ", because they are different quantities.")
	}

	// We can only convert quantative units (not can pkg carton etc)
	if t != VolumeUnit || t != WeightUnit {
		return -1.0, errors.New("Cannot convert between qualitative units!")
	}

	// Convert to Std                     Then from Std to target
	return source * sourceUnit.StdConv() * (1 / targetUnit.StdConv())
}
