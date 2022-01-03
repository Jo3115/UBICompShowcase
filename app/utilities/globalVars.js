/**
 * @fileoverview this file contains global varibles used to store consts like default settings and club lists.
 */

// DefaultSettings set when the user starts the app for the first time
export const DefaultSettings = {
	metric: 'yd',
	customDistances: true,
	target: "middle"
}

// AvalibleClubs a list of clubs that the user could alocate
export const AvalibleClubs = [
	'Driver',
	'3 Wood',
	'4 Wood',
	'5 Wood',
	'7 Wood',
	'2 Hybrid',
	'3 Hybrid',
	'4 Hybrid',
	'5 Hybrid',
	'2 Iron',
	'3 Iron',
	'4 Iron',
	'5 Iron',
	'6 Iron',
	'7 Iron',
	'8 Iron',
	'9 Iron',
	'Pitching Wedge',
	'Gap Wedge',
	'Sand Wedge',
	'Lob Wedge'
]

// AvalibleShotMetrics a list of metrics that can be used
export const AvalibleShotMetrics = [
	{
		label: 'm',
		value: 'm'
	},
	{
		label: 'ft',
		value: 'ft'
	},
	{
		label: 'yd',
		value: 'yd'
	}
]

// AvalibleTagets a list of trgets that can be used (front, middle, back)
export const AvalibleTagets = [
	{
		label: 'Front',
		value: 'front'
	},
	{
		label: 'Middle',
		value: 'middle'
	},
	{
		label: 'Back',
		value: 'back'
	}
]