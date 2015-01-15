package main

type Unit string

const (
	VolumeUnit = "volume"
	WeightUnit = "weight"
)

func (u Unit) Type() string {
	switch u {
	case UnitMililiter:
	case UnitCentiliter:
	case UnitDeciliter:
	case UnitLiter:
	case UnitFluidOunce:
	case UnitPint:
	case UnitQuart:
	case UnitGallon:
	case UnitCup:
	case UnitTablespoon:
	case UnitTeaspoon:
	case UnitPinch:
	case UnitDash:
	case UnitDrop:
		return VolumeUnit
	case UnitMiligram:
	case UnitCentigram:
	case UnitDecigram:
	case UnitGram:
	case UnitKilogram:
	case UnitOunce:
	case UnitPound:
		return WeightUnit
	case UnitSmall:
	case UnitMedium:
	case UnitLarge:
		return SizeUnit
	case UnitCan:
	case UnitPackage:
	case UnitCarton:
	case UnitSlice:
	case UnitBunch:
		return UnitQty
	}
	return "unknown"
}

func (u Unit) StdConv() float64 {
	return 0.0
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
