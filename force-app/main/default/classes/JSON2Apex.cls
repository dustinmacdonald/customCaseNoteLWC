//
// Generated by JSON2Apex http://json2apex.herokuapp.com/
//

public class JSON2Apex {

	public A027e0000096BWGAA2 a027e0000096BWGAA2;
	public A027e0000096BWGAA2 a027e000009VkfqAAC;

	public class A027e0000096BWGAA2 {
		public Object programNumber;
		public String programName;
		public String programId;
		public Boolean isOverrided;
		public Boolean isEligible;
		public Object intakeRT;
		public Object fundAvailability;
		public Object department;
		public Boolean createReferral;
		public Boolean createIntake;
	}

	
	public static JSON2Apex parse(String json) {
		return (JSON2Apex) System.JSON.deserialize(json, JSON2Apex.class);
	}
}