#ifndef __c1_BJStateflow_h__
#define __c1_BJStateflow_h__

/* Include files */
#include "sfc_sf.h"
#include "sfc_mex.h"
#include "rtwtypes.h"

/* Type Definitions */
#ifndef typedef_SFc1_BJStateflowInstanceStruct
#define typedef_SFc1_BJStateflowInstanceStruct

typedef struct {
  SimStruct *S;
  ChartInfoStruct chartInfo;
  uint32_T chartNumber;
  uint32_T instanceNumber;
  int32_T c1_sfEvent;
  uint8_T c1_tp_above0;
  uint8_T c1_tp_below0;
  boolean_T c1_isStable;
  boolean_T c1_stateChanged;
  real_T c1_lastMajorTime;
  uint8_T c1_is_active_c1_BJStateflow;
  uint8_T c1_is_c1_BJStateflow;
  real_T c1_g;
  real_T c1_k;
  real_T c1_m;
  uint8_T c1_doSetSimStateSideEffects;
  const mxArray *c1_setSimStateSideEffectsInfo;
} SFc1_BJStateflowInstanceStruct;

#endif                                 /*typedef_SFc1_BJStateflowInstanceStruct*/

/* Named Constants */

/* Variable Declarations */

/* Variable Definitions */

/* Function Declarations */
extern const mxArray *sf_c1_BJStateflow_get_eml_resolved_functions_info(void);

/* Function Definitions */
extern void sf_c1_BJStateflow_get_check_sum(mxArray *plhs[]);
extern void c1_BJStateflow_method_dispatcher(SimStruct *S, int_T method, void
  *data);

#endif
